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
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea placeholder="Post content goes here" onChange={handleTextChange} value={postText}/>
              <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'} m={1} color={"gray.800"}>
                {postText.length}/500
              </Text>
              <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
              <BsFillImageFill style={{marginLeft:"5px",cursor:"pointer"}} size={20} onClick={()=>imageRef.current.click()} />
            </FormControl>
            {imgUrl &&(
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt="selected img" />
                <CloseButton onClick={()=>setImgUrl('')} bg={'gray.800'} position={'absolute'} top={2} right={2} size={'sm'} />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} colorScheme='blue' mr={3} onClick={handleCreatePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
