import pandas as pd
import urllib2
import pdb
import nltk


def load_csv_sentences(filename):
    df = pd.read_csv(filename)
    df = df.text
    phrases = []
    for x in df:
        phrases = phrases + x.replace(',', '.').replace('?', '.').replace('!', '.').replace('\n', '.').split('.')
    phrases = [x.lower() for x in phrases if len(x) > 3 and len(x) < 200]
    return phrases


# def filter_negative_phrases(phrases):
    # phrases_to_keep = {}
    # for phrase in phrases:
    #     try:
    #         req = urllib2.Request('http://text-processing.com/api/sentiment/', 'text=' + str(phrase))
    #         response = urllib2.urlopen(req)
    #         result = eval(response.read())
    #         if result['probability']['pos'] > .55:
    #             print phrase, ': not negative. dropping'
    #         elif result['probability']['neg'] > .5:
    #             # print phrase, ': negative! keeping (score: ' + str(result['probability']['neg'] - result['probability']['pos']) + ')'
    #             phrases_to_keep[phrase] = result['probability']['neg'] - result['probability']['pos']
    #         # pdb.set_trace()
    #     except Exception, e:
    #         print e
    # return phrases_to_keep
    pass


def main():
    neg_phrases = load_csv_sentences('thoughtsandfeelings.csv')
    pos_phrases = load_csv_sentences('spiritualforums.csv')
    phrases_tagged = []
    for phrase in neg_phrases:
        phrases_tagged.append((phrase.split(), 'suicidal'))
    for phrase in pos_phrases:
        phrases_tagged.append((phrase.split(), 'alright'))
    print phrases_tagged
    word_features = get_word_features(get_words_in_phrases(phrases_tagged))


def get_words_in_phrases(phrases):
    all_words = []
    for (words, sentiment) in phrases:
        all_words.extend(words)
    return all_words


def get_word_features(wordlist):
    wordlist = nltk.FreqDist(wordlist)
    word_features = wordlist.keys()
    return word_features


def extract_features(document):
    document_words = set(document)
    features = {}
    for word in word_features:
        features['contains(%s)' % word] = (word in document_words)
    return features


def extract_features(document):
    document_words = set(document)
    features = {}
    for word in word_features:
        features['contains(%s)' % word] = (word in document_words)
    return features


if __name__ == '__main()__':
    main()
