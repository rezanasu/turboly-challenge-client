<template>
  <div class="container">
      <h1 class="text-center mb-3">EDIT TASK</h1>
    <form @submit.prevent="handleEdit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input v-model="task.title" type="text" class="form-control" placeholder="Enter title..." />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input
          v-model="task.description"
          type="text"
          class="form-control"
          placeholder="Enter description..."
        />
      </div>
      <div class="mb-3">
        <p>Priority</p>
        <select v-model="task.priority" class="form-select">
          <option disabled selected>Open this select menu...</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">Status</label>
        <div class="form-check">
          <input
            v-model="task.status"
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="true"
            checked
          />
          <label class="form-check-label" for="exampleRadios1">
            Completed
          </label>
        </div>
        <div class="form-check">
          <input
            v-model="task.status"
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="false"
          />
          <label class="form-check-label" for="exampleRadios2">
            Uncompleted
          </label>
        </div>
      </div>
      <div class="mb-3">
        <label for="dueDate" class="form-label">Due Date</label>
        <input
          v-model="task.dueDate"
          type="date"
          class="form-control"
        />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary" style="margin-right: 2rem;">SUBMIT</button>
        <button type="button" class="btn btn-danger" @click="toHome">CANCEL</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    name: 'Edit',
    methods: {
        handleEdit () {
            console.log(this.task.title)
            this.$store.dispatch('editTask', {
                id: this.task.id,
                title: this.task.title,
                description: this.task.description,
                priority: this.task.priority,
                status: this.task.status,
                dueDate: this.task.dueDate
            })
        },
        toHome () {
            this.$router.push("/")
        }
    },
    computed: {
        task () {
            return this.$store.state.selectedTask;
        }
    }
}
</script>

<style>

</style>