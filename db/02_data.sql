insert into person(last_name, middle_name, first_name, date_of_birth, address, phone) values
('Perez', 'Lopez', 'Ana', '2001-05-15', 'Calle 123, Zona Sur', '71234567'),
('Gutierrez', 'Rios', 'Mario', '2000-11-20', 'Avenida Principal, Centro', '65432109'),
('Sanchez', 'Cruz', 'Laura', '2002-02-28', 'Barrio Lindo, Lado Oeste', '77654321'),
('Flores', 'Mendez', 'David', '1999-08-10', 'Zona Industrial, Bloque 5', '60112233'),
('Rojas', 'Vargas', 'Sofia', '2003-01-01', 'Urbanización Sol, Casa 10', '79887766');

insert into student(person_id, study_plan) values
(1, 'ING'),
(2, 'MED'),
(3, 'ARQ'),
(4, 'ECO'),
(5, 'COM');