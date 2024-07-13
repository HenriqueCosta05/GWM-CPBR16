//@ts-nocheck

import React from 'react';
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
	Select,
} from '@chakra-ui/react';
import { useTable, usePagination } from 'react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const data = Array.from({ length: 50 }, (_, i) => ({
	id: i + 1,
	name: `Person ${i + 1}`,
	date: new Date(),
}));

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
			<Button colorScheme="teal" onClick={() => console.log(row.original)}>
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

	return (
		// <ChakraProvider>
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
			{/* <Flex mt={4} alignItems="center" justifyContent="space-between">
				<Flex>
					<Button
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
						mr={2}
					>
						{'<<'}
					</Button>
					<Button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
						mr={2}
					>
						{'<'}
					</Button>
					<Button onClick={() => nextPage()} disabled={!canNextPage} mr={2}>
						{'>'}
					</Button>
					<Button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{'>>'}
					</Button>
				</Flex>
				<Flex alignItems="center">
						<span>
							Página{' '}
							<strong>
								{pageIndex + 1} de {pageOptions.length}
							</strong>{' '}
						</span>
						<Select
							ml={4}
							value={pageSize}
							onChange={(e) => setPageSize(Number(e.target.value))}
							width="auto"
						>
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Mostrar {pageSize}
								</option>
							))}
						</Select>
					</Flex>
			</Flex> */}
		</Box>
		// </ChakraProvider>
	);
}

export default App;
