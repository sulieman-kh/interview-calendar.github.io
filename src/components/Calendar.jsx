import React, { useState } from 'react';
import styled from 'styled-components';
import { IoAdd, IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import {
  format,
  startOfWeek,
  addDays,
  addHours,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
  startOfHour,
} from "date-fns";
import { weekday } from '../data';
import { desktop, laptop, tab, mobile } from '../responsive';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 740px;
  ${mobile({
  width: '375px',
})}
`;
const Header = styled.div`
  padding:14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h2`
  font-weight: normal;
`;
const AddIcon = styled.div`
  font-size: 30px;
  display: flex;
  color: #ff3131;
  cursor: pointer;
`;
const Main = styled.div`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #f6f6f6;
  display: flex;
`;
const Left = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 5 50%;
`;
const CalendarHead = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-wrap: wrap;
`;
const Week = styled.div`
  display: table;
  border-collapse: collapse;
`;
const WeekDays = styled.div`
  display: table-row;
`;
const Day = styled.div`
  display: table-cell;
  padding-top: 15px;
  font-size: 14px;
  text-align: center;
  ${mobile({
  fontSize: '12px',
})}
`;
const CalendarRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 35px;
  padding-left: 35px;
  ${mobile({
  paddingLeft: '12px',
  paddingRight: '12px',
})}   
`;
const CalendarTitle = styled.h3`
`;
const IconArrows = styled.div`
  font-size: 25px;
  display: flex;
  color: #ff3131;
  cursor: pointer;
`;
const DaysOfMonth = styled.div`
display: table-row;
flex:1;
`;
const DayOfMonth = styled.div`
  z-index: 1;
  cursor: pointer;
  position: relative;
  display: table-cell;
  font-size: 25px;
  color: ${(props) => props.isActive ? '#ffff' : ''};
  text-align: center;
  padding: 15px;
  &:hover{
    color: #ffff;
  }
&::before{
  position: absolute;
  content: '';
  width: 58px;
  height:58px;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: -1;
  transition: all 0.5s ease;
  ${mobile({
  width: '45px',
  height: '45px',

})}
}
&:hover::before{
  color: #ffff;
  background-color:#ff3131;
  transition: all 0.5s ease;
  ${mobile({
  width: '45px',
  height: '45px',

})}
}
${mobile({
  fontSize: '20px',
  padding: '10px'
})}
`;
const Active = styled.div`
  position: absolute;
  content: '';
  width: 58px;
  height:58px;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: -1;
  transition: all 0.5s ease;
  background-color: ${(props) => props.isActive ? '#ff3131' : ''};
  transition: all 0.5s ease;
  ${mobile({
  width: '45px',
  height: '45px',
})}
`
const TodaySchedule = styled.div`
`;
const TableContainer = styled.div`
  overflow: auto;
  height: 500px; 
  ::-webkit-scrollbar {
    width: 4px; 
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; 
  }
  ::-webkit-scrollbar-thumb {
    background-color:  #f6f6f6; 
    border-radius: 5px; 
  }
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  `;
const Tbody = styled.tbody``;
const Row = styled.tr`
  height: 55px;
  position: relative;
  display: flex;
`;
const HourCell = styled.td`
  font-weight: 600;
  color:#cecece;
  display: flex;
  font-size: 16px;
  flex: 1;
  padding: 22px 2px 0 20px;
  margin-top: 25px;
  border-right: none;
  ${mobile({
  paddingLeft: '2px',
  fontSize: '12px',
})}
`;
const EmptyCell = styled.td`
  border: 1px solid #d4d4d4;
  width:65px;
  position: relative;
  flex:4;
  border-left: none;
  &::before{
  position: absolute;
  width: 50px;
  height: 50px;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
&:hover::before{
  background-color:black;
  transition: all 0.5s ease;
}
${mobile({
  width: '40px',
})}
`;
const Event = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  `;
const Checkmark = styled.label`
  position: relative;
  display: inline-block;
  width:94%;
  height: 94%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  ${tab({
  width: '94%',
  height: '94%',
})};
  ::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color:#ebecff;
  }
  ${Event}:checked + &::before {
    background-color:#b3b7ff;
  }
  `;
const Footer = styled.div`
display: flex;
justify-content: space-between;
height: 8vh;
text-align: center;
align-items: center;
background-color: #f6f6f6;
padding: 0px 25px;
& :last-child{
  cursor: pointer;
}
`;
const FooterButton = styled.button`
color: #ff3131;
background: #f6f6f6;
font-size: 20px;
margin:0;
padding:0;
border: 0;
`;
//-- Modal -- //
const Modal = styled.div`
  position: absolute;
  font-size: 14px; 
  color: #000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  /* height: 35vh; */
  background: #f6f6f6;
  /* padding: 3rem; */
  border-radius: 25px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
  ${desktop({
  width: '50%',
})};
  ${laptop({
  width: '50%',
})}
  ${tab({
  width: '60%',
})}
  ${mobile({
  width: '68%',
  borderRadius: '20px',
})}
`;
const Overlay = styled.div`
display: fixed;
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.4);
z-index: 9;
`;
const TitleModal = styled.h1`
  padding-top: 15px;
  margin-bottom: 0;
${tab({ fontSize: '20px' })}
${mobile({ fontSize: '20px' })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Label = styled.label``;
const InputDate = styled.input`
  margin:25px 0 15px;
  width: 320px;
  font-size: 18px;
  padding: 5px;
  ${tab({ width: '220px', })}
  ${mobile({ width: '180px', fontSize: '12px', margin: '12px 0 22px', })}
`;
const ButtonsModal = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: end;
  align-items: end;
  height: 40%;
  bottom: 0; 
  width: 100%;
& :first-child {
  border-bottom-left-radius: 25px;
${mobile({
  borderBottomLeftRadius: '20px'
})}
}
& :last-child {
  border-bottom-right-radius: 25px;
  ${mobile({
  borderBottomRightRadius: '20px',
})}
}
`;
const ButtonModal = styled.button`
  cursor: pointer;
  width: 100%;
  background: #f6f6f6;
  border: 1px solid #ddd;
  color: #4d9ef6;
  font-size: 24px;
  padding: 30px;
  ${mobile({ fontSize: '18px', padding: '12px', })}
`;


const Calendar = () => {
  //-- Modal --//
  const [showModal, setShowModal] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const handleCloseModal = () => {
    setShowModal(false);
    setDateValue('');
  };
  const handleShowModal = () => {
    setShowModal(true);
    setDateValue('');
  };
  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };
  //-- Events --//
  const [interviewArray, setInterviewArray] = useState([]);
  const [events, setEvents] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const interview = new Date(dateValue);
    interviewArray.push(interview);
    setShowModal(false);
    const dataEvents = () => {
      let id = 0;
      let year;
      let month;
      let dateInterview;
      let day;
      let hour;

      interviewArray.map(e => {
        const dateEvent = new Date(e)
        id = id + 1;
        hour = `${dateEvent.getHours()}`.padStart(2, 0) + ':00';
        day = weekday[dateEvent.getDay() - 1];
        month = dateEvent.getMonth() + 1;
        year = dateEvent.getFullYear();
        dateInterview = dateEvent.getDate();
        const selected = false;

        const newEvent = {
          id,
          year,
          month,
          dateInterview,
          day,
          hour,
          selected,
        };
        setEvents([...events, newEvent]);
      });
    };
    dataEvents();
  };
  //-- Select and delete Event --//
  const [selectedEvent, setSelectedEvent] = useState([]);
  const handleCellClick = (event) => {
    if (selectedEvent.includes(event)) {
      setSelectedEvent(selectedEvent.filter((selectedEvent) => selectedEvent !== event));
    } else {
      setSelectedEvent(selectedEvent.concat(event));
    };
  };
  const handleDeleteEvent = () => {
    const updatedEvents = events.filter(event => !event.selected);
    setEvents(updatedEvents);
    setSelectedEvent([]);
  };

  const handleCheckboxChange = (id) => {
    const updatedEvent = events.map(addEventListener => {
      if (addEventListener.id === id) {
        return { ...addEventListener, selected: !addEventListener.selected };
      };
      return addEventListener;
    });
    setEvents(updatedEvent);
  };
  //-- Calendar initializing --//
  const today = new Date();
  const [curentHour, setCurrentHour] = useState(today.getHours());
  const [currentMonth, setCurrentMonth] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [table, setTable] = useState([]);

  const renderCurrentMonth = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <CalendarTitle>
        {format(currentMonth, dateFormat)}
      </CalendarTitle>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <Day key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Day>
      );
    };
    return <WeekDays>{days}</WeekDays>
  };

  const renderDaysOfMonth = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rowMonth = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < weekday.length; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <DayOfMonth key={i} isActive={today.getDate() === Number(format(day, dateFormat)) && today.getMonth() + 1 === currentMonth.getMonth() + 1}>
            {formattedDate}
            <Active key={i} isActive={today.getDate() === Number(format(day, dateFormat)) && today.getMonth() + 1 === currentMonth.getMonth() + 1} />
          </DayOfMonth>
        );
        day = addDays(day, 1);
      };
      rowMonth.push(days);
      days = [];
    };
    return <DaysOfMonth>{rowMonth}</DaysOfMonth>
  };

  const renderTable = () => {
    const dateFormat = "HH";
    let startHour = startOfHour(curentHour, startOfHour(1));
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const rowsTable = [];

    for (let i = 0; i < 24; i++) {
      const cells = [];
      for (let j = -1; j < 7; j++) {
        if (j === -1) {
          cells.push(<HourCell key={j}>{format(addHours(startHour, i), dateFormat)}:00</HourCell>)
        } else if (i === -1) {
          cells.push(<EmptyCell key={j}> {format(addDays(startDate, j), 'd')}</EmptyCell>)
        } else {
          const hour = `${format(addHours(startHour, i), dateFormat)}:00`;
          const dayOfMonth = Number(format(addDays(startDate, j), 'd'));
          const month = currentMonth.getMonth() + 1;
          // const day = format(addDays(startDate, j + 1), 'EEEE');
          const interview = events.find((e) => e.hour === hour && e.dateInterview === dayOfMonth && e.month === month);
          const cell = interview ? (<EmptyCell key={j}>
            <Event
              key={interview.id}
              checked={interview.selected}
              onClick={() => handleCellClick(j)} type='checkbox' onChange={() => handleCheckboxChange(interview.id)}
              id={interview.id}
            />
            <Checkmark htmlFor={interview.id} />
          </EmptyCell>) : (
            <EmptyCell key={j}>
            </EmptyCell>
          )
          cells.push(cell);
        };
      };
      rowsTable.push(<Row key={i}>{cells}</Row>)
    };
    return rowsTable;
  };
  table.push(renderTable);

  const changeWeekHandle = (ButtonType) => {
    if (ButtonType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (ButtonType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const renderFooter = () => {
    return (
      <CalendarRow>
        <IconArrows onClick={() => changeWeekHandle("prev")}>
          <IoChevronBackOutline />
        </IconArrows>
        {renderCurrentMonth()}
        <IconArrows onClick={() => changeWeekHandle("next")}>
          <IoChevronForwardOutline />
        </IconArrows>
      </CalendarRow>
    );
  };
  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>
            Interview Calendar
          </Title>
          <>
            <AddIcon onClick={handleShowModal}><IoAdd /></AddIcon>
            {showModal &&
              <>
                <Overlay />
                <Modal show={showModal}>
                  <Form onSubmit={handleSubmit}>
                    <TitleModal>https://calendar.com</TitleModal>
                    <Label htmlFor="date-input">Enter event time:</Label>
                    <Label>YYYY-MM-DD HH:mm:ss</Label>
                    <InputDate
                      type="datetime-local"
                      id="date-input"
                      name="date"
                      value={dateValue}
                      onChange={handleDateChange}
                    />
                    <ButtonsModal>
                      <ButtonModal type="button" onClick={handleCloseModal}>Cansel</ButtonModal>
                      <ButtonModal type="submit">Ok</ButtonModal>
                    </ButtonsModal>
                  </Form>
                </Modal>
              </>
            }
          </>
        </Header>
        <Main>
          <Left>  </Left>
          <Right>
            <CalendarHead>
              <Week>
                {renderDays()}
                {renderDaysOfMonth()}
              </Week>
              {renderFooter()}
            </CalendarHead>
          </Right>
        </Main>
        <TodaySchedule>
          <TableContainer>
            <Table >
              <Tbody>
                {renderTable()}
              </Tbody>
            </Table>
          </TableContainer>
        </TodaySchedule>
        {/* Footer */}
        <Footer>
          <FooterButton>Today</FooterButton>
          {selectedEvent?.length > 0 && (
            <FooterButton onClick={handleDeleteEvent}>Delete</FooterButton>
          )
          }
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default Calendar