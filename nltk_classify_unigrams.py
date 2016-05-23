import nltk.classify.util
from nltk.classify import NaiveBayesClassifier
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.util import *
import pandas as pd
import urllib2
import pdb
import datetime
from vaderSentiment.vaderSentiment import sentiment as vaderSentiment


def filter_negative_phrases(phrases):
    for phrase in phrases:
        try:
            req = urllib2.Request('https://japerk-text-processing.p.mashape.com/sentiment/', 'text=' + str(phrase))
            req.add_header('X-Mashape-Key', 'aUisSbUwWqmshbye6c1UpIe9qxtep1LIHSjjsnI81LIi9gZmKR')
            response = urllib2.urlopen(req)
            result = eval(response.read())
            phrases_to_keep = {}
            if result['probability']['pos'] > .55:
                print phrase, ': not negative. dropping'
            elif result['probability']['neg'] > .5:
                # print phrase, ': negative! keeping (score: ' +
                # str(result['probability']['neg'] - result['probability']['pos']) + ')'
                phrases_to_keep[phrase] = result['probability']['neg'] - result['probability']['pos']
            # pdb.set_trace()
        except Exception, e:
            print e
    return phrases_to_keep


def filter_positive_phrases(phrases):
    phrases_to_keep = {}
    for phrase in phrases:
        try:
            req = urllib2.Request('https://japerk-text-processing.p.mashape.com/sentiment/', 'text=' + str(phrase))
            req.add_header('X-Mashape-Key', 'aUisSbUwWqmshbye6c1UpIe9qxtep1LIHSjjsnI81LIi9gZmKR')
            response = urllib2.urlopen(req)
            result = eval(response.read())
            if result['probability']['pos'] > .55:
                phrases_to_keep[phrase] = result['probability']['neg'] - result['probability']['pos']
            elif result['probability']['neg'] < .5:
                phrases_to_keep[phrase] = result['probability']['neg'] - result['probability']['pos']
            # pdb.set_trace()
        except Exception, e:
            print e
    return phrases_to_keep


def load_csv_sentences(filename):
    df = pd.read_csv(filename)
    df = df.text
    phrases = []
    for x in df:
        phrases = phrases + x.replace(',', '.').replace('?', '.').replace('!', '.').replace('\n', '.').split('.')
    phrases = [x.lower() for x in phrases if len(x) > 3 and len(x) < 200]
    return phrases


def write_csv_files_with_vader():
    for filename in ["neg_phrases_filtered.txt",
                     "pos_phrases_filtered.txt",
                     "neg_phrases.txt",
                     "pos_phrases.txt"]:
        new_filename = 'vader_' + filename
        with open(filename, "r") as file:
            phrases = file.readlines()
            with open(new_filename, 'w') as new_file:
                for phrase in phrases:
                    vader_sent = vaderSentiment(str(phrase))
                    new_file.write(phrase[:-1] + ',' \
                                   + str(vader_sent['neg']) + ',' \
                                   + str(vader_sent['neu']) + ',' \
                                   + str(vader_sent['pos']) + ',' \
                                   + str(vader_sent['compound']) + '\n')


def write_webtext_csv():
    from nltk.corpus import webtext
    file_reader = webtext.open('overheard.txt')
    with open('webtext_phrases.csv', 'w') as file:
        for line in file_reader:
            if ':' in line:
                try:
                    line = str(line.lower())
                    line = line[line.index(':') + 2:]
                    phrases = line.replace(',', '.').replace('?', '.').replace('!', '.').replace('\n', '.').split('.')
                    for phrase in phrases:
                        if len(phrase) > 3 and len(phrase) < 200:
                            file.write(phrase + '\n')
                except Exception:
                    pass
    # phrases.to_csv('webtext_phrases.csv')

class SuicideClassifier(object):

    def __init__(self, num_phrases_to_track=20):
        # neg_phrases = filter_negative_phrases(load_csv_sentences('thoughtsandfeelings.csv'))
        # pos_phrases = filter_positive_phrases(load_csv_sentences('spiritualforums.csv'))
        # file_pos = open("pos_phrases.txt", 'w')
        # file_neg = open("neg_phrases.txt", 'w')

        # for item in pos_phrases:
        #     print>>file_pos, item
        # for item in neg_phrases:
        #     print>>file_neg, item
        self.recent_sentiment_scores = []

        neg_file = open("neg_phrases_filtered.txt", "r")
        pos_file = open("pos_phrases_filtered.txt", "r")
        neg_phrases = neg_file.readlines()
        pos_phrases = pos_file.readlines()

        neg_docs = []
        pos_docs = []
        for phrase in neg_phrases:
            neg_docs.append((phrase.split(), 'suicidal'))
        for phrase in pos_phrases:
            pos_docs.append((phrase.split(), 'alright'))

        print len(neg_docs)
        print len(pos_docs)
        negcutoff = len(neg_docs) * 3 / 4
        poscutoff = len(pos_docs) * 3 / 4

        train_pos_docs = pos_docs[:poscutoff]
        test_pos_docs = pos_docs[poscutoff:]
        train_neg_docs = neg_docs[:negcutoff]
        test_neg_docs = neg_docs[negcutoff:]
        training_docs = train_pos_docs + train_neg_docs
        testing_docs = test_pos_docs + test_neg_docs

        self.sentim_analyzer = SentimentAnalyzer()
        all_words = self.sentim_analyzer.all_words([doc for doc in training_docs])
        unigram_feats = self.sentim_analyzer.unigram_word_feats(all_words, min_freq=2)
        self.sentim_analyzer.add_feat_extractor(extract_unigram_feats, unigrams=unigram_feats)

        bigram_feats = self.sentim_analyzer.bigram_collocation_feats(all_words, min_freq=4)
        self.sentim_analyzer.add_feat_extractor(extract_bigram_feats, bigrams=bigram_feats)

        training_set = self.sentim_analyzer.apply_features(training_docs)
        test_set = self.sentim_analyzer.apply_features(testing_docs)
        trainer = NaiveBayesClassifier.train
        self.classifier = self.sentim_analyzer.train(trainer, training_set)
        for key, value in sorted(self.sentim_analyzer.evaluate(test_set).items()):
            print('{0}: {1}'.format(key, value))

    def test(self, phrase):
        all_words = self.sentim_analyzer.all_words([phrase.split()])
        unigram_feats = self.sentim_analyzer.unigram_word_feats(all_words)
        return self.sentim_analyzer.classify(unigram_feats)

    def update_sentiments(self, value):
        now = datetime.datetime.now()
        self.recent_sentiment_scores.append([now, value])
        self.recent_sentiment_scores = [x for x in self.recent_sentiment_scores if x[
            0] > now - datetime.timedelta(seconds=60)]
        print sum([x[1] for x in self.recent_sentiment_scores]) / len(self.recent_sentiment_scores)
        return sum([x[1] for x in self.recent_sentiment_scores]) / len(self.recent_sentiment_scores)


def main():
    classifier = SuicideClassifier()
    test_string = ''
    print 'Welcome!'
    while str(test_string) not in ('q', 'quit', 'exit'):
        test_string = raw_input('Enter phrase to test: ')
        our_classifier_results = classifier.test(str(test_string))
        vader_sent = vaderSentiment(str(test_string))
        print('Our classifier says: ' + our_classifier_results)
        print 'Vader says: ' + str(vader_sent)
        if classifier.update_sentiments(vader_sent['compound']) < -.3:
            if our_classifier_results == 'suicidal':
                print 'Please consider calling a hotline... I\'m worried about you...'
            else:
                print 'Hey, we can talk if you want to...'
        print '\n'

if __name__ == '__main()__':
    main()
