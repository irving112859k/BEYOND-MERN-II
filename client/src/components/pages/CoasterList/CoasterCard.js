import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CoastersPage.css'

const CoasterCard = ({ _id, title, description, owned, imageUrl }) => {

  const editFunction = () => alert("Esto ya os lo currais vosotros")

  return (
    <Card className="coaster-card" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}.
        </Card.Text>

        <Link to={`/coaster/${_id}`}>
          <Button variant="primary">Detalles</Button>
        </Link>
        {owned && <Button onClick={editFunction} variant="secondary" className="ms-3">Editar</Button>}
      </Card.Body>
    </Card>
  )
}

export default CoasterCard