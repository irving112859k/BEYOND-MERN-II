import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import Spinner from '../../shared/Spinner/Spinner'
import CoasterService from '../../../services/coaster.service'
import UploadService from '../../../services/upload.service'

export default class NewCoasterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      coaster: {
        title: "",
        description: "",
        length: "",
        inversions: "",
        imageUrl: ""
      },

      loading: false
    }

    this.service = new CoasterService()
    this.uploadService = new UploadService()
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.service.createCoaster(this.state.coaster)
      .then(response => {
        this.props.closeModal()
        this.props.refreshCoasters()
      })
      .catch(err => console.log(err))

  }

  handleInputChange = (e) => {
    const { name, value } = e.currentTarget

    this.setState({
      coaster: {
        ...this.state.coaster,
        [name]: value
      }
    })
  }

  handleUploadChange = (e) => {

    this.setState({ loading: true })

    const uploadData = new FormData()
    uploadData.append('imageData', e.target.files[0])

    this.uploadService
      .uploadImage(uploadData)
      .then(response => {

        this.setState({
          coaster: {
            ...this.state.coaster,
            imageUrl: response.data.cloudinary_url
          },
          loading: false
        })
      })
      .catch(err => console.log(err))

  }



  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={this.handleInputChange} value={this.state.title} name="title" type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="length">
          <Form.Label>Longitud</Form.Label>
          <Form.Control onChange={this.handleInputChange} value={this.state.length} name="length" type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="inversions">
          <Form.Label>Inversiones</Form.Label>
          <Form.Control onChange={this.handleInputChange} value={this.state.inversions} name="inversions" type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageData">
          <Form.Label>Archivo de imagen</Form.Label>
          <Form.Control onChange={this.handleUploadChange} name="imageData" type="file" />
        </Form.Group>

        {this.state.loading && <Spinner shape="circle" />}
        <Button disabled={this.state.loading} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}
