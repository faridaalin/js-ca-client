const showToast = (toast, position, title, msg, status) => {
  return toast({
    position: position,
    title: title,
    description: msg,
    status: status,
    duration: 5000,
    isClosable: true,
  });
};

export default showToast;
