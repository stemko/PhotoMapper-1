import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photoInfo: { photos: [] },
    errorList: [],
    selectedItem: null,
    zoomToSelected: false
  },

  mutations: {
    loadPhotos (state, url) {
      axios.get(url)
        .then(response => {
          if (response.status === 200) {
            var list = response.data.photos
            list.forEach(p => {
              p.dateTime = new Date(p.timestamp)
            })
            state.photoInfo = response.data
          } else {
            state.errorList.push('Request failed: %d, %s', response.status, response.data)
          }
        })
        .catch(error => {
          console.log('error: %o', error)
          state.errorList.push(error)
        })
    },

    removeError (state, error) {
      var index = state.errorList.indexOf(error)
      if (index >= 0) {
        state.errorList.splice(index, 1)
      }
    },

    selectItem (state, params) {
      state.zoomToSelected = params.zoomTo
      if (!params.item) {
        state.selectedItem = null
        return
      }

      if (params.item !== state.selectedItem) {
        state.selectedItem = params.item
      }
    }

  }
})
