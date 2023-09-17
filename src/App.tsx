import {
  Button,
  Container,
  Grid,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  ArrowForwardIos,
  CalendarMonth,
  AccessTime,
  PlaceOutlined,
  ConfirmationNumberOutlined,
  FormatListBulletedOutlined,
  GridViewOutlined,
} from '@mui/icons-material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Events} from './interfaces/events';
import {useTranslation} from 'react-i18next';
import bootshausLogo from './images/logo.png';

import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import {useState} from 'react';
import {fetchEventList} from './services/fetchEventList';

function App() {
  const {t, i18n} = useTranslation();
  const [selectedView, setSelectedView] = useState('grid');
  const [eventList, setEventList] = useState<Events[]>([]);
  dayjs().locale(i18n.language);
  fetchEventList().then(eventList => {
    setEventList(eventList);
  });
  function GridEventCardTemplate(event: Events) {
    return (
        <Grid item xs={12} data-testid={'grid-view-open'}>
          <Grid container spacing={3} rowSpacing={{xs: 2, md: 5}}>
            <Grid item xs={12} md={4}>
              <Box
                  component="img"
                  alt={event.title}
                  src={event.imageUrl}
                  sx={{
                    width: '100%',
                    borderRadius: 3,
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={5}>
              <Grid container direction="row" alignItems="center"
                    rowSpacing={'5px'}>
                <Grid item xs={12}>
                  <Typography variant="h2">{event.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" alignItems="center"
                        spacing={1}>
                    <Grid item>
                      <CalendarMonth sx={{display: 'flex'}}/>
                    </Grid>
                    <Grid item>
                      {dayjs(event.startDate).format('dd. DD.MM.YYYY')}
                    </Grid>
                    <Grid item>
                      <AccessTime sx={{display: 'flex', marginLeft: '15px'}}/>
                    </Grid>
                    <Grid item>
                      {dayjs(event.startDate).format('HH.mm')} {t(
                        'globals.clock')}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" alignItems="center"
                        spacing={1}>
                    <Grid item>
                      <PlaceOutlined sx={{display: 'flex'}}/>
                    </Grid>
                    <Grid item>
                      {event.address.addressLocality} {/* Missing property for location name */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" alignItems="center"
                        spacing={1}>
                    <Grid item>
                      <ConfirmationNumberOutlined sx={{display: 'flex'}}/>
                    </Grid>
                    <Grid item>
                      {t('globals.ticketsFrom')} {event.priceFrom.toFixed(
                        2)}€ {/* TODO: Missing locale change */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    endIcon={<ArrowForwardIos/>}
                    href={event.shopUrl}
                    target="_blank"
                >
                  {t('eventListPage.buttonTickets')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
    );
  }

  function ListEventCardTemplate(event: Events) {
    const listStyling = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingRight: '15px !important',
      paddingTop: '15px !important',
      paddingBottom: '15px !important',
    };
    return (
        <Grid item xs={12}
              data-testid={'list-view-open'}
              sx={{
                ':nth-child(odd) .striped-list': {
                  backgroundColor: '#F2F2F2',
                },
              }}>
          <Grid container spacing={3} rowSpacing={0} className={'striped-list'}>
            <Grid item xs={12} md={5} sx={listStyling}>
              <Typography variant="h2"
                          sx={{marginBottom: 0}}>{event.title}</Typography>
              <Grid container direction="row" alignItems="center"
                    spacing={1}>
                <Grid item>
                  <PlaceOutlined sx={{display: 'flex'}}/>
                </Grid>
                <Grid item>
                  {event.address.addressLocality} {/* Missing property for location name */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} sx={listStyling}>
              {t('globals.at')} {dayjs(event.startDate).
                format('DD.MM.YYYY')}<br/>
              {t('globals.from')} {dayjs(event.startDate).format('HH.mm')} {t(
                'globals.clock')}
            </Grid>
            <Grid item xs={12} sm={6} md={2} sx={listStyling}>
              {t('globals.ticketsFrom')}<br/><b>{event.priceFrom.toFixed(
                2)}€</b> {/* TODO: Missing locale change */}
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={listStyling}>
              <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    endIcon={<ArrowForwardIos/>}
                    href={event.shopUrl}
                    target="_blank"
                >
                  {t('eventListPage.buttonTickets')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
    );
  }

  function CalendarTemplate() {
    return (
        <Grid container spacing={3}
              data-testid={'calender-view-open'}><Typography
            variant={'h2'}>{t('calenderView.headline')}</Typography></Grid>);
  }

  function ViewTemplate() {
    return (
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
            <Typography sx={{paddingRight: '10px', paddingTop: '5px'}}>{t(
                'eventListPage.view')}:</Typography>
            <IconButton className={selectedView === 'grid' ? 'active' : ''}
                        data-testid={'grid-view-button'}
                        onClick={() => setSelectedView(
                            'grid')}><GridViewOutlined/></IconButton>
            <IconButton className={selectedView === 'list' ? 'active' : ''}
                        data-testid={'list-view-button'}
                        onClick={() => setSelectedView(
                            'list')}><FormatListBulletedOutlined/></IconButton>
            <IconButton className={selectedView === 'calendar' ? 'active' : ''}
                        data-testid={'calendar-view-button'}
                        onClick={() => setSelectedView(
                            'calendar')}><CalendarMonth/></IconButton>
          </Grid>
        </Grid>
    );
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <Container sx={{marginBottom: '30px'}}>
          <Grid container textAlign={'center'}>
            <Grid item xs={12}>
              <Box
                  component="img"
                  alt={'Logo'}
                  src={bootshausLogo}
                  className={'main-logo'}
                  sx={{
                    maxWidth: "100%",
                    margin: "39px auto 10px",
                  }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} rowSpacing={0}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h1">{t(
                  'eventListPage.headline')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{marginBottom: '10px'}}>
              {ViewTemplate()}
            </Grid>
            {selectedView === 'grid' && eventList.map(
                (event: Events) => (GridEventCardTemplate(event)))}
            {selectedView === 'list' && eventList.map(
                (event: Events) => (ListEventCardTemplate(event)))}
            {selectedView === 'calendar' && CalendarTemplate()}
          </Grid>
        </Container>
      </LocalizationProvider>
  );
}

export default App;
