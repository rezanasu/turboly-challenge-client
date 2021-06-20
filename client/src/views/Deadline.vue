<template>
  <div class="container-fluid">
    <h1 class="text-center">TODAY DEADLINES</h1>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in deadlines" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>
              <span v-if="task.priority === 1">High</span>
              <span v-else-if="task.priority === 2">Medium</span>
              <span v-else-if="task.priority === 3">Low</span>
              <span v-else>Low</span>
            </td>
            <td>
              <span v-if="task.status" class="badge bg-success rounded-pill"
                >completed</span
              >
              <span v-else class="badge bg-danger rounded-pill"
                >uncompleted</span
              >
            </td>
            <td>{{ moment(task.dueDate).format("LL") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deadline",
  computed: {
    deadlines() {
      return this.$store.state.deadlines;
    },
  },
  created() {
    this.$store.dispatch("fetchDeadlines");
  },
};
</script>

<style>
</style>