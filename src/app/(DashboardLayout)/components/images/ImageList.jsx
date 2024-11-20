import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ImageBox = styled(Box)(({ theme }) => ({
  aspectRatio: '1/1',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    '& img': {
      transform: 'scale(1.15)',
    },
    '& .overlay': {
      opacity: 1,
    },
  },
}));

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
});

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0, // Hidden by default
  transition: 'opacity 0.4s ease',
  borderRadius: theme.shape.borderRadius * 2,
  color: '#fff', // White text for contrast
  fontSize: '1.2rem',
  fontWeight: 500,
  letterSpacing: '0.5px',
  textAlign: 'center',
  padding: '10px',
}));

const itemData = [
  {
    img: 'https://yesassistant.com/wp-content/uploads/2022/04/Luxury-Business-Card-1-670x540.jpg',
    title: 'Luxury Touch',
  },
    {
    img: 'https://wavecolordrop.com/wp-content/uploads/2023/10/laminated-matte-business-cards-1.png',
    title: 'Matte Finish',
  },
  {
    img: 'https://www.premiumbusinesscards.co.uk/wp-content/uploads/2022/01/2-2.jpg',
    title: 'Elegant Design',
  },
  {
    img: 'https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/site-merchandising/e0adfb26-d28d-47be-b7be-514eb8209367/en-au/ANZS-bc-standard-pp-marquee-001',
    title: 'Professional Look',
  },
];

export default function ImageListHome() {
  return (
    <Box
      p={2}
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <Grid container spacing={2}>
        {itemData.map(({ img, title }) => (
          <Grid item xs={12} md={6} key={title}>
            <ImageBox>
              <StyledImage src={img} alt={title} loading="lazy" />
              <ImageOverlay className="overlay">{title}</ImageOverlay>
            </ImageBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

