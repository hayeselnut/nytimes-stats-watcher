import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("./nytimes-stats-watcher-firebase-adminsdk-kb436-ca4786d665.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'nytimes-stats-watcher',
})

db = firestore.client()
date = '2021-05-23'

print('writing for', date)

doc_ref = db.collection('leaderboards').document(date)
doc_ref.set({
    'al6155': 31,
    'jj': 142,
    'Adam :))': 58,
    'emilyyyyyyyyy': 42,
    'swagchamp': 32,
    'Pravin': 60,
    'xlpotatoez': 44,
    'taro': 74,
    'Hayeselnut': 179,
    # 'nickrewell0411': 60+57,
})

    # 'al6155': ,
    # 'jj': ,
    # 'Adam :))': ,
    # 'emilyyyyyyyyy': ,
    # 'swagchamp': ,
    # 'Pravin': ,
    # 'xlpotatoez': ,
    # 'taro': ,
    # 'Hayeselnut': ,