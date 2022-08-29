

export default class APIService {
    static UpdateArticle(id, body) {
        return fetch(`/update/${id}/`, {
            'method':'PUT',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(resp => resp.json())
    }

    static AddArticle(body) {
        return fetch(`/add`, {
            'method':'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(resp => resp.json())
    }

    static DeleteArticle(id) {
        return fetch(`/delete/${id}/`, {
            'method':'DELETE',
            headers: {
              'Content-Type':'application/json'
            },
          })
    }
}