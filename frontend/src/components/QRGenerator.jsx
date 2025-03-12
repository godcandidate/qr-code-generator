import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useColorMode,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
  Flex,
  Textarea,
  useToast,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';

const API_URL = 'http://localhost:8000/api';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [template, setTemplate] = useState('modern');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const toast = useToast();

  const templates = {
    modern: { foreground: '#2B5BE0', background: '#FFFFFF' },
    classic: { foreground: '#000000', background: '#FFFFFF' },
    dots: { foreground: '#1A365D', background: '#FFFFFF' },
    rounded: { foreground: '#000000', background: '#FFFFFF' }
  };

  const generateQRCode = useCallback(async () => {
    if (!text) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: text,
          ...templates[template],
          size: 250,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }

      const data = await response.json();
      setQrCode(data.image);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [text, template, toast]);

  const downloadQRCode = useCallback(() => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
  }, [qrCode]);

  return (
    <Container maxW="container.lg" py={4}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={8}
      >
        {/* Left Column - Controls */}
        <GridItem>
          <Box 
            bg={isDark ? 'gray.700' : 'white'} 
            p={6} 
            borderRadius="lg" 
            shadow="sm" 
            height="100%"
            borderWidth="1px"
            borderColor={isDark ? 'gray.600' : 'gray.200'}
          >
            <Tabs variant="soft-rounded" colorScheme="blue" mb={6}>
              <TabList gap={2}>
                <Tab 
                  _selected={{ 
                    bg: isDark ? 'blue.500' : 'blue.50',
                    color: isDark ? 'white' : 'blue.600'
                  }}
                >
                  URL
                </Tab>
                <Tab
                  _selected={{ 
                    bg: isDark ? 'blue.500' : 'blue.50',
                    color: isDark ? 'white' : 'blue.600'
                  }}
                >
                  Text
                </Tab>
                <Tab
                  _selected={{ 
                    bg: isDark ? 'blue.500' : 'blue.50',
                    color: isDark ? 'white' : 'blue.600'
                  }}
                >
                  Email
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0}>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com/my-awesome-page"
                    size="lg"
                    variant="filled"
                    _placeholder={{ color: isDark ? 'gray.400' : 'gray.400' }}
                  />
                </TabPanel>
                <TabPanel px={0}>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your message here... 
Example: Welcome to our store! 
Check out our latest collection at the entrance.
Opening hours: 9 AM - 6 PM"
                    size="lg"
                    variant="filled"
                    minH="150px"
                    _placeholder={{ color: isDark ? 'gray.400' : 'gray.400' }}
                    resize="vertical"
                  />
                </TabPanel>
                <TabPanel px={0}>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="contact@mycompany.com"
                    size="lg"
                    variant="filled"
                    _placeholder={{ color: isDark ? 'gray.400' : 'gray.400' }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Text 
              mb={4} 
              fontSize="sm" 
              color={isDark ? 'gray.400' : 'gray.600'}
              fontWeight="medium"
            >
              Style
            </Text>

            <Select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              variant="filled"
              size="md"
              mb={6}
              cursor="pointer"
              _hover={{ borderColor: isDark ? 'blue.400' : 'blue.500' }}
            >
              <option value="modern">Modern Blue</option>
              <option value="classic">Classic Black</option>
              <option value="dots">Navy Dots</option>
              <option value="rounded">Rounded Black</option>
            </Select>

            <Button
              colorScheme="blue"
              onClick={generateQRCode}
              isLoading={loading}
              loadingText="Generating..."
              width="full"
              size="lg"
              mb={4}
            >
              Generate QR Code
            </Button>
          </Box>
        </GridItem>

        {/* Right Column - QR Code Display */}
        <GridItem>
          <Flex
            direction="column"
            bg={isDark ? 'gray.700' : 'white'}
            p={6}
            borderRadius="lg"
            shadow="sm"
            height="100%"
            justify="center"
            align="center"
            borderWidth="1px"
            borderColor={isDark ? 'gray.600' : 'gray.200'}
          >
            <Box 
              bg={isDark ? 'gray.800' : 'gray.50'} 
              p={8} 
              borderRadius="lg"
              mb={6}
              borderWidth="1px"
              borderColor={isDark ? 'gray.600' : 'gray.200'}
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
              position="relative"
              minH="250px"
              minW="250px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {loading ? (
                <Spinner size="xl" color="blue.500" thickness="4px" />
              ) : qrCode ? (
                <Image src={qrCode} alt="QR Code" />
              ) : (
                <Text color={isDark ? 'gray.400' : 'gray.500'}>
                  Your QR code will appear here
                </Text>
              )}
            </Box>

            <Button
              leftIcon={<FaDownload />}
              colorScheme="blue"
              onClick={downloadQRCode}
              isDisabled={!qrCode}
              size="lg"
              width={{ base: "full", md: "200px" }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Download
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default QRGenerator;
