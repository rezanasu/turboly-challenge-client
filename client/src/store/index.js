import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../API/axios.js"
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    tasks: [],
    selectedTask: {},
    sortBy: 'created_at',
    deadlines: []
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setTasks (state, payload) {
      state.tasks = payload
    },
    addTask (state, payload) {
      state.tasks.push(payload)
    },
    setSelectedTask (state, payload) {
      state.selectedTask = payload
    },
    setSortBy (state, payload) {
      state.sortBy = payload
    },
    setDeadlines (state, payload) {
      state.deadlines = payload
    }
  },
  actions: {
    login (state, payload) {
      axios({
        method: "POST",
        url: "/login",
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      .then(response => {
        const generatedToken = response.data.token
        localStorage.setItem("access_token", generatedToken)
        state.commit('setLogin', true);
        router.push('/')
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchTasks(context) {
      console.log(context.state.sortBy)
      axios({
        method: "GET",
        url: `/tasks?sortBy=${context.state.sortBy}`,
        headers: {Authorization: localStorage.getItem('access_token')}
      })
      .then(response => {
        const result = response.data.tasks;
        context.commit('setTasks', result)
        
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchDeadlines(context) {
      axios({
        method: "GET",
        url: "/deadlines",
        headers: {Authorization: localStorage.getItem('access_token')}
      })
      .then(response => {
        const deadlines = response.data.tasks
        context.commit('setDeadlines', deadlines)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addTask(state, payload) {
      console.log(state)
      console.log(payload, "<<<<<<<<< PAYLOAD")
      axios({
        method: "POST",
        url: "/tasks",
        headers: {Authorization: localStorage.getItem('access_token')},
        data: {
          title: payload.title,
          description: payload.description,
          priority: payload.priority,
          status: payload.status,
          dueDate: payload.dueDate
        }
      })
      .then(response => {
        const newTask = response.data.task;
        state.commit('addTask', newTask);
        router.push('/');
      })
      .catch(err => {
        console.log(err);
      })
    },
    updateStatus (state, payload) {
      axios({
        method: "PATCH",
        url: `/tasks/${payload.id}`,
        headers: {Authorization: localStorage.getItem('access_token')},
        data: {
          status: payload.status
        }
      })
      .then(() => {
        state.dispatch('fetchTasks')
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteTask (state, payload) {
      axios({
        method: "DELETE",
        url: `/tasks/${payload.id}`,
        headers: {Authorization: localStorage.getItem('access_token')}
      })
      .then(() => {
        state.dispatch('fetchTasks')
        state.dispatch('fetchDeadlines')
      })
      .catch(err => {
        console.log(err);
      })
    },
    findTaskById (state, payload) {
      axios({
        method: "GET",
        url: `/tasks/${payload.id}`,
        headers: {Authorization: localStorage.getItem('access_token')}
      })
      .then(response => {
        const getTask = response.data.task;
        state.commit('setSelectedTask', getTask);
        router.push("/edit");
      })
      .catch(err => {
        console.log(err);
      })
    },
    editTask (state, payload) {
      axios({
        method: "PUT",
        url: `/tasks/${payload.id}`,
        headers: {Authorization: localStorage.getItem('access_token')},
        data: {
          title: payload.title,
          description: payload.description,
          priority: payload.priority,
          status: payload.status,
          dueDate: payload.dueDate
        }
      })
      .then(response => {
        console.log(response);
        router.push("/")
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
