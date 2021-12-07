## Spinner

  - 1. Crear carpeta *Shared* y crear Spinner.js y Spinner.css
  - 2. Importar dónde sea necesario y darle la prop *shape* circle.
  - 3. Profit!

  Como alternativa se pueden usar los spinners de bootstrap.

## Cloudinary

  - 1. Crear *cloudinary.config* en el server.
  - 2. Incluir en el .env las variables de entorno.
    ```js
      CLOUDINARY_NAME=
      CLOUDINARY_KEY=
      CLOUDINARY_SECRET=
    ```
  - 3. Creamos *upload.routes* y las requerimos en el indice de rutas.
  - 4. En cliente creamos el servicio *upload.service*.
  - 5. Importamos el servicio en el formulario y lo instanciamos.
  - 6. Adaptamos los inputs del formulario. (type="file") 
  - 7. Creamos el método handleUpload.
      - Este método generará un objeto **FormData** al que le añadiremos el archivo de imagen. Después enviaremos al backend este **FormData** a través del servicio.

      ```js
          handleUploadChange = (e) => {
            this.setState({ loading: true })

            const uploadData = new FormData()
            uploadData.append('imageData', e.target.files[0])

            this.uploadService
              .uploadImage(uploadData)
              .then(response => 
                this.setState({
                  coaster: {
                    ...this.state.coaster,
                    imageUrl: response.data.cloudinary_url
                  },
                  loading: false
                })
              )
              .catch(err => console.log(err))

          }
      ```

  - 8. Enganchamos el método al input de imagen. 
  - 9. (Opcional) Incluimos un indicador de carga de la imagen (loading)
  - 10. (Opcional) De ser necesario adaptamos el state.