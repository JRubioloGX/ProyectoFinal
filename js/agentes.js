const { createApp } = Vue
createApp({
    data() {
        return {
            agentes: [],
            url: 'https://juvanko.pythonanywhere.com/agentes',
            error: false,
            cargando: true,
            /*atributos para guardar los valores del formulario */
            id: 0,
            nombre: "",
            rol: "",
            origen: "",
            descripcion: "",
            logo: "",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.agentes = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(agente) {
            const url = this.url + '/' + agente;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let agente = {
                nombre: this.nombre,
                rol: this.rol,
                origen: this.origen,
                descripcion: this.descripcion,
                logo: this.logo
            }
            var options = {
                body: JSON.stringify(agente),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./agentes.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')