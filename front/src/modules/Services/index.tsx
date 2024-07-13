//@ts-nocheck
import React, { useState } from 'react';
import {
	ChakraProvider,
	Box,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Flex,
	Input,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import { useTable, usePagination } from 'react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import useHandleSubmit from '../../hooks/useHandleSubmit';

const data = Array.from({ length: 50 }, (_, i) => ({
	id: i + 1,
	name: `Person ${i + 1}`,
	date: new Date(),
}));
const handleSubmit = () => {
	const url =
		'https://calendar.google.com/calendar/r/eventedit?text=Atendimento%20-%20Cuidados%20na%20gravidez&dates=20240726T140000Z/20240726T140000Z&details=Atendimento%20referente%20a%20cuidados%20na%20gravidez.&location=Office&add=conference&conference=hangoutsMeet&add=&sf=true&output=xml';
	window.open(url, '_blank');
};
const columns = [
	{
		Header: 'ID',
		accessor: 'id',
	},
	{
		Header: 'Nome',
		accessor: 'name',
	},
	{
		Header: 'Data e Horário',
		accessor: 'date',
		Cell: ({ value }) =>
			format(new Date(value), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
	},
	{
		Header: 'Ações',
		Cell: ({ row }) => (
			<Button colorScheme="teal" onClick={handleSubmit}>
				Aceitar Agendamento
			</Button>
		),
	},
];

function App() {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 10 },
		},
		usePagination
	);

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);
	const [textDate, setTextDate] = useState('');
	const [textTime, setTextTime] = useState('');

	return (
		<ChakraProvider>
			<Box p={4}>
				<Table {...getTableProps()}>
					<Thead>
						{headerGroups.map((headerGroup) => (
							<Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
								{headerGroup.headers.map((column) => (
									<Th {...column.getHeaderProps()} key={column.id}>
										{column.render('Header')}
									</Th>
								))}
							</Tr>
						))}
					</Thead>
					<Tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<Tr {...row.getRowProps()} key={row.id}>
									{row.cells.map((cell) => (
										<Td {...cell.getCellProps()} key={cell.column.id}>
											{cell.render('Cell')}
										</Td>
									))}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
				<Flex mt={4} justify="space-between" align="center">
					<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous
					</Button>
					<Box>
						Page{' '}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>
					</Box>
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</Button>
				</Flex>
				<Box mt={4}>
					<FormControl as="form" onSubmit={handleSubmit}>
						<FormLabel>Data</FormLabel>
						<Input
							type="date"
							value={textDate}
							onChange={(e) => {
								setTextDate(e.target.value);
								setSelectedDate(e.target.valueAsDate);
							}}
						/>
						<FormLabel>Hora</FormLabel>
						<Input
							type="time"
							value={textTime}
							onChange={(e) => {
								setTextTime(e.target.value);
								setSelectedTime(e.target.valueAsDate);
							}}
						/>
						<Button type="submit" colorScheme="teal" mt={4}>
							Submit
						</Button>
					</FormControl>
				</Box>
			</Box>
		</ChakraProvider>
	);
}

export default App;
