import { useContext } from "react";
import { ThemeContext } from "../../Theme/themeContext";
import { Typography, Box, Stack, Button, IconButton, useMediaQuery } from '@mui/material';
import icon from '../../assets/newchat.png';
import { Link } from 'react-router-dom';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Icon for Dark Mode
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Icon for Light Mode

export default function Sidebar({ setChat, closeMenu }) {
    const { mode, setMode } = useContext(ThemeContext);
    const isMobile = useMediaQuery('(max-width:800px)'); // Detect mobile screen size

    const handleMode = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <Box height="100%" display="flex" flexDirection="column">
            {/* Sidebar Content */}
            <Box flexGrow={1}>
                {/* Conditionally render the Close button only on mobile screens */}
                {isMobile && (
                    <Button
                        endIcon={<CloseIcon />}
                        sx={{
                            width: 1,
                            justifyContent: 'flex-end',
                            color: mode === 'light' ? 'primary.dark' : 'text.primary',
                            marginTop: 2,
                        }}
                        onClick={closeMenu} // Close sidebar when clicked
                    >
                        Close
                    </Button>
                )}

                {/* New Chat Section */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Stack
                        onClick={() => {
                            setChat([]);
                            closeMenu(); // Close the sidebar on new chat click
                        }}
                        sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.bg',
                            },
                        }}
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        py={2}
                        px={{ xs: 2, md: 3 }}
                    >
                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                            <Box
                                component={'img'}
                                src={icon}
                                height={42}
                                width={42}
                                borderRadius={2}
                                boxShadow={4}
                                flexShrink={0}
                            />
                            <Typography
                                variant={'heading'}
                                fontSize={{ xs: 16, md: 20 }}
                                color={'text.primary'}
                            >
                                New Chat
                            </Typography>
                        </Stack>
                        <AddCommentIcon sx={{ color: 'text.primary' }} />
                    </Stack>
                </Link>

                {/* Past Conversations Section */}
                <Box p={{ xs: 2, md: 3 }}>
                    <Link to="/history" style={{ textDecoration: 'none', width: '100%' }}>
                        <Button
                            variant="contained"
                            sx={{ width: 1 }}
                            onClick={closeMenu} // Close the sidebar on past conversations click
                        >
                            Past Conversations
                        </Button>
                    </Link>
                </Box>
            </Box>

            {/* Dark/Light Mode Toggle at the Bottom */}
            <Box sx={{ mt: 'auto', py: 2, px: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>{mode === 'light' ? 'Light Mode' : 'Dark Mode'}</Typography>
                    <IconButton onClick={handleMode} color="inherit">
                        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
}
