import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'

import { patchItem } from '@/slices/currentItem'

export default function PageItemTile(props) {
  const dispatch = useDispatch()
  const { itemsId, imageUrl, itemName, allergens, createdAt, description } =
    props.data

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { getAccessTokenSilently } = useAuth0()

  const [updatedItem, setUpdatedItem] = useState(props.data)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [token, setToken] = useState(null)

  async function handleAvailability() {
    const fetchToken = await getAccessTokenSilently()
    setToken(fetchToken)
    setShouldUpdate(true)
    if (updatedItem.availability === 'Yes') {
      setUpdatedItem({ ...updatedItem, availability: 'No' })
    } else {
      setUpdatedItem({ ...updatedItem, availability: 'Yes' })
    }
  }

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(patchItem({ item: updatedItem, token }))
    }
  }, [updatedItem])

  return (
    <>
      <Box>
        <Image h='100px' src={imageUrl} />
        <Heading>{itemName}</Heading>
        <Text>Allergens: {allergens}</Text>
        <Text>Description: {description}</Text>
        <Text>Date Posted: {createdAt}</Text>
        {updatedItem.availability === 'Yes' ? (
          <Button onClick={handleAvailability} colorScheme='teal'>
            Make Unavailable
          </Button>
        ) : (
          <Button onClick={handleAvailability} colorScheme='teal'>
            Make Available
          </Button>
        )}
        <ReactLink to={`/item/update/${itemsId}`}>
          <Button colorScheme='teal'>Edit Item</Button>
        </ReactLink>

        {/* <ReactLink to={`/item/${itemsId}`}> */}
        <Button onClick={onOpen} colorScheme='teal'>
          View Item
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bgGradient='linear(to-t, #7DA97A, #e5eee4)'
            backdropFilter='auto'
            backdropBlur='10px'
          />
          <ModalContent>
            <ModalHeader bg='#e5eee4' color='#1d6638'>
              {itemName}
            </ModalHeader>
            <ModalCloseButton bg='#7da97a' />
            <ModalBody bg='#e5eee4'>
              <Image src={imageUrl} />
              <Text>Allergens: {allergens}</Text>
              <Text>Description: {description}</Text>
              <Text>Date Posted: {createdAt}</Text>
            </ModalBody>

            <ModalFooter bg='#e5eee4'>
              <Button bg='#7da97a' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* </ReactLink> */}
      </Box>
    </>
  )
}
