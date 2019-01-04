<template>
  <div class="home"> 
    <button v-on:click="create">Create DateBase</button>
    <button v-on:click="add">Add Record</button>
    <button v-on:click="get">Get Records</button>
    <button v-on:click="forage">Forage</button>
    <button v-on:click="worker">Web Worker</button>
    <button v-on:click="encrypt">Encrypt</button>
    <div id="result"></div>
    <div class="version">v 1.0.1</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"; 
export default {
  name: "home",
  components: {
    HelloWorld
  }, 
  methods: {
    encrypt(){
      
    },
    forage() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
          users.forEach(user => {
            this.$setItem(user.id, user, event => {
              console.log(event);
            });
          });
        });
    }, 
    create() {
      var request = indexedDB.open("MyTestDatabase", 1);
      request.onsuccess = event => {
        var db = event.target.result;
      };
      // This event is only implemented in recent browsers
      request.onupgradeneeded = function(event) {
        // Save the IDBDatabase interface
        var db = event.target.result;
        // Create an objectStore sfor this database
        db.createObjectStore("name", { keyPath: "myKey" });
        db.createObjectStore("customers", { keyPath: "id" });
      };
    },
    add() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
          var request = indexedDB.open("MyTestDatabase", 1);

          request.onsuccess = event => {
            const db = event.target.result;
            var customerObjectStore = db
              .transaction("customers", "readwrite")
              .objectStore("customers");

            users.forEach(function(user) {
              customerObjectStore.add(user);
            });
          };
        });
    },
    get() {
      var request = indexedDB.open("MyTestDatabase", 1);

      request.onsuccess = event => {
        const db = event.target.result,
          objectStore = db
            .transaction(["customers"], "readwrite")
            .objectStore("customers");

        var request = objectStore.getAll();
        request.onerror = function(event) {
          // Handle errors!
        };
        request.onsuccess = function(event) {
          var el = document.getElementById('result');
          event.target.result.forEach((element) => {
            var div = document.createElement('div');
            div.innerHTML = element.name;
            el.appendChild(div);
          });
        };
      };
    },
    worker() {
     debugger;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .version{
   position: fixed;
   bottom: 20px;
   right: 20px; 
 }
</style>
