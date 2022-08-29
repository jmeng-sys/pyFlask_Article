import './App.css';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {

  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)
  const updatedData = (article) => {
    const new_article = articles.map(my_article => {
      if(my_article.id === article.id){
        return article 
      }else { 
        return my_article 
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEditedArticle({title:'', body:''})
  }

  const addedArticle = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
    
  }

  const deletedArticle = (article) => {
    const new_articles = articles.filter(my_article => {
      if(my_article.id === article.id) {
        return false;
      }
      return true;
    })
    setArticles(new_articles)
  }

  useEffect(() => {
    fetch('http://us-cdbr-east-06.cleardb.net:5000/get', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(err => console.log(err))
  },[])

  const editArticle = (article) => {
    setEditedArticle(article)
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Flask and ReactJS Project</h1>

        </div>
        <div className="col">
          <button 
          className="btn btn-success"
          onClick={openForm}
          >Add Article</button>
        </div>
      </div>

      <br />
      <br />
      <ArticleList articles={articles} editArticle={editArticle} deletedArticle={deletedArticle}/>
      {editedArticle ? <Form article={editedArticle} updatedData={updatedData} addedArticle={addedArticle} 
      /> : null}
      
      

    </div>
  );
}

export default App;
