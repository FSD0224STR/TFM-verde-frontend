import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext } from 'react';
import { LocationContext } from '../../context/locationContext';

export function DateCalendarValue() {

   const{setDate,dateInput,setDateInput}=useContext(LocationContext)

   dayjs.locale('es')

   const isDateDisabled = (date) => {
      return dayjs(date).isBefore(dayjs(),'day'); 
   };

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} locale={dayjs.locale()}>
    
         <DatePicker  
            sx={{bgcolor:'white'}}  
            value={dateInput}
            onChange={(newValue) => {setDateInput(newValue),setDate(newValue)}}
            shouldDisableDate={isDateDisabled}
            slotProps={{ 
               day: {
                  sx: {
                     color: 'primary.main'
                  },
               },
              
               textField: { 
                  format:'DD/MM/YYYY',
                  variant: 'filled',
                  inputProps:{style:{backgroundColor: 'white', color: 'black',fontSize:'small',textAlign:'center'}}},
               openPickerButton: {style:{backgroundColor:'#163938',color:'white'}},
            
            }}
        
         />
   
      </LocalizationProvider>
   );
}
