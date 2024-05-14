import { useState } from "react";
import { Box, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

const Index = () => {
  const [code, setCode] = useState("");
  const toast = useToast();

  const handleExecuteCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const func = new Function(code);
      func();
      toast({
        title: "Execution Successful",
        description: "Your JavaScript code has been executed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Execution Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Textarea placeholder="Write your JavaScript code here..." value={code} onChange={(e) => setCode(e.target.value)} size="lg" height="200px" mb={4} />
      <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handleExecuteCode}>
        Execute Code
      </Button>
    </Box>
  );
};

export default Index;
