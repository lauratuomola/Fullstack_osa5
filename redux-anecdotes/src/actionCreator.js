
const generateId = () => Number((Math.random() * 1000000).toFixed(0))
export default {
  anecdoteCreation(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        votes: 0,
        id: generateId()
      }
    }

  },

  like(id) {
    return {
      type: 'LIKE',
      data: { id }
    }
  }
}