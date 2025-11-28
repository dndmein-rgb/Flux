import { userAtom } from "@/atoms/userAtom";
import usePreviewImage from "@/hooks/usePreviewImage";
import useShowToast from "@/hooks/useShowToast";
import { AddIcon } from "@chakra-ui/icons";
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";

const CreatePost = () => {
  const [loading,setLoading]=useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postText,setPostText]=useState('')
  const{handleImageChange,imgUrl,setImgUrl}=usePreviewImage();
  const imageRef=useRef();
  const user=useRecoilValue(userAtom)
  const showToast=useShowToast();
  const handleTextChange=(e)=>{
    const inputText = e.target.value;
    if(inputText.length > 500){
      const truncatedText = inputText.slice(0, 500);
      setPostText(truncatedText);
    } else {
      setPostText(inputText);
    }
  }
  const handleCreatePost=async()=>{
    setLoading(true);
    try {
      const res=await fetch('/api/posts/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          postedBy:user._id,
          text:postText,
          img:imgUrl
        })
      })
      const data=await res.json();
      if(data.error){
        showToast('Error',data.error,'error')
        return
      }
      showToast('Success', 'Post created successfully', 'success')
      onClose();
      setPostText('');
      setImgUrl('');
    } catch (error) {
      showToast('Error', error.message, 'error')
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        size="lg"
        boxShadow={useColorModeValue(
          '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
          '0 10px 15px -3px rgba(59, 130, 246, 0.4)'
        )}
        onClick={onOpen}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: useColorModeValue(
            '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            '0 20px 25px -5px rgba(59, 130, 246, 0.5)'
          ),
        }}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent 
          borderRadius="2xl"
          mx={4}
        >
          <ModalHeader 
            fontSize="2xl" 
            fontWeight="700"
            fontFamily="heading"
          >
            Create Post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea 
                placeholder="What's on your mind?" 
                onChange={handleTextChange} 
                value={postText}
                size="lg"
                minH="120px"
                resize="none"
                borderRadius="lg"
              />
              <Flex justify="space-between" align="center" mt={2}>
                <Button
                  variant="ghost"
                  leftIcon={<BsFillImageFill />}
                  onClick={()=>imageRef.current.click()}
                  size="sm"
                  colorScheme="brand"
                >
                  Add Image
                </Button>
                <Text 
                  fontSize={'xs'} 
                  fontWeight={'600'} 
                  color={postText.length > 450 ? "red.500" : useColorModeValue("gray.600", "gray.400")}
                >
                  {postText.length}/500
                </Text>
              </Flex>
              <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
            </FormControl>
            {imgUrl &&(
              <Flex mt={4} w={'full'} position={'relative'} borderRadius="lg" overflow="hidden">
                <Image src={imgUrl} alt="selected img" w="full" />
                <CloseButton 
                  onClick={()=>setImgUrl('')} 
                  bg={useColorModeValue('white', 'gray.800')}
                  position={'absolute'} 
                  top={2} 
                  right={2} 
                  size={'md'}
                  borderRadius="full"
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter gap={3}>
            <Button 
              variant="ghost" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              isLoading={loading} 
              onClick={handleCreatePost}
              isDisabled={!postText.trim()}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
