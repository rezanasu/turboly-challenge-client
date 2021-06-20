<template>
  <div class="container-fluid">
    <h1 class="text-center mb-3 p-3">TASKS LIST</h1>
    <div v-if="deadlines.length !== 0" class="alert alert-dismissible alert-warning p-3">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>You Have {{deadlines.length}} Tasks due today. Please check deadlines for more details...</strong>
    </div>
    <div class="d-flex justify-content-between p-3 mb-3">
      <button class="btn btn-success" @click="toAdd">ADD NEW TASK</button>
      <form>
        <select @change="sortTask($event)" class="form-select">
          <option disabled selected>Sort by...</option>
          <option value="created_at">Created At</option>
          <option value="dueDate">Due Date</option>
          <option value="description">Description</option>
          <option value="priority">Priority</option>
        </select>
        
      </form>
    </div>
    <hr>
    <div class="p-3 table-responsive">
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col">Due Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{task.title}}</td>
            <td>{{task.description}}</td>
            <td>
              <span v-if="task.priority === 1">High</span>
              <span v-else-if="task.priority === 2">Medium</span>
              <span v-else-if="task.priority === 3">Low</span>
              <span v-else>Low</span>
            </td>
            <td>
              <span v-if="task.status" class="badge bg-success rounded-pill">completed</span>
              <span v-else class="badge bg-danger rounded-pill">uncompleted</span>
            </td>
            <td>{{moment(task.dueDate).format('LL')}}</td>
            <td><button @click="updateStatus(task.id, task.status)" class="btn btn-primary btn-sm">CHANGE STATUS</button> <button @click="handleEdit(task.id)" class="btn btn-secondary btn-sm">EDIT</button> <button @click="deleteTask(task.id)" class="btn btn-sm btn-danger">DELETE</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    toAdd () {
      this.$router.push("/add");
    },
    updateStatus (id, currentStatus) {
      let newStatus = !currentStatus;

      this.$store.dispatch('updateStatus', {
        id,
        status: newStatus
      })
    },
    deleteTask (id) {
      this.$store.dispatch('deleteTask', {
        id
      })
    },
    handleEdit (id) {
      this.$store.dispatch('findTaskById', {
        id
      })
    },
    sortTask (event) {
      const sortBy = event.target.value
      this.$store.commit('setSortBy', sortBy);
      this.$store.dispatch("fetchTasks");
    }
    
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    deadlines() {
      return this.$store.state.deadlines;
    }
  },
  created() {
    this.$store.dispatch("fetchTasks");
    this.$store.dispatch("fetchDeadlines");
  },
};
</script>

<style>
</style>