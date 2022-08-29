from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://b311eefdbfe0ce:3e8fd0eb@us-cdbr-east-06.cleardb.net/heroku_96a386148a4caf8'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
@cross_origin()
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)


@app.route('/get/<id>/', methods=['GET'])
@cross_origin()
def get_details(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
@cross_origin()
def add_article():
    title = request.json['title']
    body = request.json['body']

    articles = Articles(title, body)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)


@app.route('/update/<id>/', methods=['PUT'])
@cross_origin()
def update_article(id):
    article = Articles.query.get(id)

    title = request.json['title']
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()
    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
@cross_origin()
def article_delete(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
