import nltk.classify.util
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import movie_reviews
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.util import *
import pandas as pd
import urllib2
import pdb
 
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
    neg_docs = []
    pos_docs = []
    for phrase in neg_phrases:
        neg_docs.append((phrase.split(), 'suicidal'))
    for phrase in pos_phrases:
        pos_docs.append((phrase.split(), 'alright'))

    negcutoff = len(neg_docs)*3/4
    poscutoff = len(pos_docs)*3/4

    train_pos_docs = pos_docs[:poscutoff]
    test_pos_docs = pos_docs[poscutoff:]
    train_neg_docs = neg_docs[:negcutoff]
    test_neg_docs = neg_docs[negcutoff:]
    training_docs = train_pos_docs + train_neg_docs
    testing_docs = test_pos_docs + test_neg_docs
    sentim_analyzer = SentimentAnalyzer()
    all_words = sentim_analyzer.all_words([doc for doc in training_docs])
    unigram_feats = sentim_analyzer.unigram_word_feats(all_words, min_freq=4)
    sentim_analyzer.add_feat_extractor(extract_unigram_feats, unigrams=unigram_feats)

    # bigram_feats = sentim_analyzer.bigram_collocation_feats(all_words, min_freq=4)
    # sentim_analyzer.add_feat_extractor(extract_bigram_feats, bigrams=bigram_feats)

    training_set = sentim_analyzer.apply_features(training_docs)
    test_set = sentim_analyzer.apply_features(testing_docs)
    trainer = NaiveBayesClassifier.train
    classifier = sentim_analyzer.train(trainer, training_set)
    for key,value in sorted(sentim_analyzer.evaluate(test_set).items()):
        print('{0}: {1}'.format(key, value))

if __name__ == '__main()__':
    main()