console.log(location.search) // lee los argumentos pasados a este formulario
var id = location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            /*id: 0,*/
            nombre: "",
            rol: "",
            origen: "",
            descripcion: "",
            logo: "",
            url: 'https://juvanko.pythonanywhere.com/agentes/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.rol = data.rol
                    this.origen = data.origen
                    this.descripcion = data.descripcion
                    this.logo = data.logo
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let agente = {
                nombre: this.nombre,
                rol: this.rol,
                origen: this.origen,
                descripcion: this.descripcion,
                logo: this.logo
            }
            var options = {
                body: JSON.stringify(agente),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
