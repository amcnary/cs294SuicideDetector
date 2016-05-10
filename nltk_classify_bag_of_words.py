import nltk.classify.util
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import movie_reviews
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


def main():
    neg_phrases = load_csv_sentences('thoughtsandfeelings.csv')
    pos_phrases = load_csv_sentences('spiritualforums.csv')
    neg_phrases_tagged = []
    pos_phrases_tagged = []
    for phrase in neg_phrases:
        neg_phrases_tagged.append((word_feats(phrase.split()), 'suicidal'))
    for phrase in pos_phrases:
        pos_phrases_tagged.append((word_feats(phrase.split()), 'alright'))

    negcutoff = len(neg_phrases_tagged)*3/4
    poscutoff = len(pos_phrases_tagged)*3/4
     
    trainfeats = neg_phrases_tagged[:negcutoff] + pos_phrases_tagged[:poscutoff]
    testfeats = neg_phrases_tagged[negcutoff:] + pos_phrases_tagged[poscutoff:]
    print 'train on %d instances, test on %d instances' % (len(trainfeats), len(testfeats))
     
    classifier = NaiveBayesClassifier.train(trainfeats)
    print 'accuracy:', nltk.classify.util.accuracy(classifier, testfeats)
    classifier.show_most_informative_features()


if __name__ == '__main()__':
    main()