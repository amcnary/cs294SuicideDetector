import nltk.classify.util
from nltk.classify import NaiveBayesClassifier
import pandas as pd
import urllib2
import pdb


# This is the bag of words model
def word_feats(words):
    return dict([(word, True) for word in words])


def load_csv_sentences(filename):
    df = pd.read_csv(filename)
    df = df.text
    phrases = []
    for x in df:
        phrases = phrases + x.replace(',', '.').replace('?', '.').replace('!', '.').replace('\n', '.').split('.')
    phrases = [x.lower() for x in phrases if len(x) > 3 and len(x) < 200]
    return phrases


class SuicideClassifier(object):
    def __init__(self):
        # neg_phrases = filter_negative_phrases(load_csv_sentences('thoughtsandfeelings.csv'))
        # pos_phrases = filter_positive_phrases(load_csv_sentences('spiritualforums.csv'))
        neg_file = open("neg_phrases.txt", "r")
        pos_file = open("pos_phrases.txt", "r")
        neg_phrases = neg_file.readlines()
        pos_phrases = pos_file.readlines()

        neg_phrases_tagged = []
        pos_phrases_tagged = []
        for phrase in neg_phrases:
            neg_phrases_tagged.append((word_feats(phrase.split()), 'suicidal'))
        for phrase in pos_phrases:
            pos_phrases_tagged.append((word_feats(phrase.split()), 'alright'))

        negcutoff = int(len(neg_phrases_tagged) * .8)
        poscutoff = int(len(pos_phrases_tagged) * .8)

        trainfeats = neg_phrases_tagged[:negcutoff] + pos_phrases_tagged[:poscutoff]
        testfeats = neg_phrases_tagged[negcutoff:] + pos_phrases_tagged[poscutoff:]
        print 'train on %d instances, test on %d instances' % (len(trainfeats), len(testfeats))

        self.classifier = NaiveBayesClassifier.train(trainfeats)
        print 'accuracy:', nltk.classify.util.accuracy(self.classifier, testfeats)
        self.classifier.show_most_informative_features()

    def test(self, phrase):
        return self.classifier.classify(word_feats(phrase))


def main():
    classifier = SuicideClassifier()
    test_string = ''
    print 'Welcome!'
    while str(test_string) not in ('q', 'quit', 'exit'):
        test_string = raw_input('Enter phrase to test: ')
        print(classifier.test(str(test_string)))


if __name__ == '__main()__':
    main()
