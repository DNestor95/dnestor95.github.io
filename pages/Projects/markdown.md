---
title: Machine Learning for Bot Detection 
date: 2021/3/19
description: Machine Learning for Bot Detection GitHub 
tag: Machine Learning
author: You
---



## GitHub
https://github.com/DNestor95/BOTZ/blob/main/TFgraph.py

The projects was something that me and few classmates worked on during a previous semester. 

This project used tensorflow to create a model of data pulled from an older version of twitter that was then used to train a model that would then be able to 
detect if a account with the same pulled information was a bot. We were able to garner suprising accuracy on the data set and I hope to use alot of this 
project and the ML skills that I learned for a current project that I am working on. 

## Blockquotes

> Develop. Preview. Ship. – Vercel

## Project Features

- Use oif Machine Learning Techniques to create models and test them against data
- Troubleshooting and parsing of data to create useable and managable data sets. 
- Additional added fewatuers to imporve run time and better generate models. (optimization of epoch and batch size)





## Example Eval

This code shows how we built the model and display the resutls of it. The code was the modified to allow for us to test many different epochs and batch sizes to attempt to
determine which of the combinatiosn would give us the best results. 

```
from __future__ import absolute_import, division, print_function, unicode_literals

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import datetime
from IPython.display import clear_output
from six.moves import urllib

import tensorflow as tf
from tensorflow import feature_column as fc


# Load data
dftrain = pd.read_csv('modded_detection_data.csv')  # training data
dfeval = pd.read_csv('eval.csv')  # testing data


dftrain['BotLabel'] = dftrain['BotLabel'].astype(int)
dfeval['BotLabel'] = dfeval['BotLabel'].astype(int)


# Separate labels
y_train = dftrain.pop('BotLabel')
y_eval = dfeval.pop('BotLabel')

# Categorical columns
CATEGORICAL_COLUMNS = ['Username', 'Hashtags']  # Include 'Hashtags' in categorical columns
# Numeric columns
NUMERIC_COLUMNS = ['FollowerCount', 'RetweetCount', 'MentionCount', 'Verified']

feature_columns = []

# Numeric columns
for feature_name in NUMERIC_COLUMNS:
    feature_columns.append(tf.feature_column.numeric_column(feature_name, dtype=tf.float32))

# Categorical columns
for feature_name in CATEGORICAL_COLUMNS:
    if feature_name == 'Hashtags':
        # Ensure embedding_dimension is defined before using it
        embedding_dimension = min(8, len(dftrain[feature_name].unique()) // 2)
        feature_columns.append(
            tf.feature_column.embedding_column(
                tf.feature_column.categorical_column_with_hash_bucket(feature_name, hash_bucket_size=1000),
                dimension=embedding_dimension))
    else:
        vocabulary = dftrain[feature_name].unique()
        feature_columns.append(tf.feature_column.categorical_column_with_vocabulary_list(feature_name, vocabulary))
        # Embedding for categorical columns
        embedding_dimension = min(8, len(vocabulary) // 2)
        feature_columns.append(
            tf.feature_column.embedding_column(
                tf.feature_column.categorical_column_with_vocabulary_list(feature_name, vocabulary),
                dimension=embedding_dimension))

# Input function
def make_input_fn(data_df, label_df, num_epochs=10, shuffle=True, batch_size=8):
    def input_function():
        data_df['Hashtags'].fillna('', inplace=True)
        data_df.fillna('missing', inplace=True)
        data_df['Hashtags'] = data_df['Hashtags'].astype(str)
        ds = tf.data.Dataset.from_tensor_slices((dict(data_df), label_df))
        if shuffle:
            ds = ds.shuffle(1000)
        ds = ds.batch(batch_size).repeat(num_epochs)
        return ds
    return input_function

#for loop to attempt batch sizes and epoch to find the most effictive testing the batch size aginst each epoch
batch_size = [8, 16, 32, 64, 128, 256, 512, 1024]
epoch = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
#dictionary for the accuracy and the batch size and epoch that it was tested with
batch_acc_dict = {}
epoch_acc_dict = {}
max_batch_acc = 0
max_batch_size = 0
max_epoch_acc = 0
max_epoch = 0


"""
for i in batch_size:
    train_input_fn = make_input_fn(dftrain, y_train, batch_size=i)
    eval_input_fn = make_input_fn(dfeval, y_eval, num_epochs=1, shuffle=False)

    linear_est = tf.estimator.LinearClassifier(feature_columns=feature_columns)
    linear_est.train(train_input_fn)
    result = linear_est.evaluate(eval_input_fn)

    clear_output()
    
    print(i)
    #add the accuracy and i to the dictiona
    batch_acc_dict[result['accuracy']] = i
    #if the accuracy is higher than the previous highest accuracy, set the new highest accuracy
    if result['accuracy'] > max_batch_acc:
        max_batch_acc = result['accuracy']
        max_batch_size = i
    
    print(result['accuracy'])
    print(result)
    
    """

#function that maakes a results file for the result that is passed in
def makeResultsFile(result, i, j):
    #open the file
    f = open("results.txt", "a")
    #write the accuracy
    f.write("Accuracy: " + str(result['accuracy']))
    
    
    #write the batch size
    f.write(" Batch Size: " + str(j))
    #write the epoch
    f.write(" Epoch: " + str(i))
    f.write("\n")
    #close the file
    f.close()





train_input_fn = make_input_fn(dftrain, y_train, num_epochs=70, batch_size=32)
eval_input_fn = make_input_fn(dfeval, y_eval, num_epochs=1, shuffle=False)

linear_est = tf.estimator.LinearClassifier(feature_columns=feature_columns)
linear_est.train(train_input_fn)
result = linear_est.evaluate(eval_input_fn)

print(result)
```



[^2]: Footnote text.
