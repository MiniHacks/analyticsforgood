import os

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

for dirname, _, filenames in os.walk('./data/'):
    for filename in filenames:
        print(os.path.join(dirname, filename))
data = pd.read_csv('./data/Churn_Modelling.csv')
data.head()

labels = data['Exited']
le = LabelEncoder()
le.fit(labels)
labels = le.transform(labels)
class_names = le.classes_

data = data.drop(['RowNumber', 'CustomerId', 'Surname', 'Exited'], axis=1)
data.head()

feature_names = data.columns.tolist()

categorical_features = [1, 2, 7, 8]
categorical_names = {}
for feature in categorical_features:
    column = data.iloc[:, feature].values
    le = LabelEncoder()
    le.fit(column)
    data.iloc[:, feature] = le.transform(column)
    categorical_names[feature] = le.classes_

seed = 101  # fix random seed for reproducibility
np.random.seed(seed)

# Split Train Test sets
train, test, labels_train, labels_test = train_test_split(data, labels,
                                                          test_size=0.2,
                                                          stratify=labels,
                                                          random_state=seed)
print(train.shape, test.shape, labels_train.shape, labels.shape)
