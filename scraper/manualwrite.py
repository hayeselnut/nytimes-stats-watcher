import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("./nytimes-stats-watcher-firebase-adminsdk-kb436-ca4786d665.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'nytimes-stats-watcher',
})

db = firestore.client()

doc_ref = db.collection('leaderboards').document('2021-05-15')
doc_ref.set({
    'al6155': 40,
    'jj': 4*60+4,
    'Adam :))': 90,
    'emilyyyyyyyyy': 107,
    'swagchamp': 52,
    'Pravin': 106,
    # 'xlpotatoez': ,
    'taro': 4*60+37,
    'Hayeselnut': 5*60+26,
    # 'Daph': ,
})