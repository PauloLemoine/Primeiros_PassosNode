
INSERT INTO cargo (cbo, nome, salario) VALUES
('5141-05', 'Cabeleireiro', 1500.00),
('5141-10', 'Barbeiro', 1200.00),
('5141-15', 'Manicure', 1000.00),
('5141-20', 'Pedicure', 1000.00),
('5141-25', 'Esteticista', 2000.00),
('5141-30', 'Massoterapeuta', 1800.00),
('5141-35', 'Depilador', 1200.00),
('5141-40', 'Maquiador', 1500.00),
('5141-45', 'Auxiliar de Cabeleireiro', 900.00),
('5141-50', 'Auxiliar de Manicure', 850.00);

-- Inserindo dados na tabela funcionario
INSERT INTO funcionario (cpf_funcionario, nome, cargo_cbo) VALUES
('12345678901', 'João Pereira', '5141-05'),
('12345678902', 'Maria Oliveira', '5141-10'),
('12345678903', 'Carlos Souza', '5141-15'),
('12345678904', 'Ana Costa', '5141-20'),
('12345678905', 'Fernanda Silva', '5141-25'),
('12345678906', 'Paulo Santos', '5141-30'),
('12345678907', 'Luana Lima', '5141-35'),
('12345678908', 'Rafael Almeida', '5141-40'),
('12345678909', 'Juliana Martins', '5141-45'),
('12345678910', 'Rodrigo Costa', '5141-50');

-- Inserindo dados na tabela cliente
INSERT INTO cliente (cpf, nome) VALUES
('11122233344', 'Ana Souza'),
('11122233345', 'Carlos Lima'),
('11122233346', 'Juliana Rocha'),
('11122233347', 'Eduardo Silva'),
('11122233348', 'Patrícia Fernandes'),
('11122233349', 'Ricardo Santos'),
('11122233350', 'Luciana Alves'),
('11122233351', 'Marcos Pereira'),
('11122233352', 'Fernanda Oliveira'),
('11122233353', 'Tânia Costa');

-- Inserindo dados na tabela servicos
INSERT INTO servicos (nome, valor) VALUES
('Corte de Cabelo', 50.00),
('Barba', 30.00),
('Manicure Simples', 20.00),
('Pedicure Simples', 25.00),
('Maquiagem', 80.00),
('Depilação Facial', 40.00),
('Massagem Relaxante', 60.00),
('Limpeza de Pele', 100.00),
('Corte de Cabelo Masculino', 45.00),
('Design de Sobrancelha', 30.00);

-- Inserindo dados na tabela agendamento
INSERT INTO agendamento (datas, horario, valorTotal, cliente_cpf, funcionario_cpf_funcionario) VALUES
('2024-04-01', '10:00:00', 150.00, '11122233344', '12345678901'),
('2024-04-02', '14:00:00', 60.00, '11122233345', '12345678902'),
('2024-04-03', '09:30:00', 180.00, '11122233346', '12345678903'),
('2024-04-04', '16:00:00', 75.00, '11122233347', '12345678904'),
('2024-04-05', '11:00:00', 100.00, '11122233348', '12345678905'),
('2024-04-06', '12:00:00', 150.00, '11122233349', '12345678906'),
('2024-04-07', '13:30:00', 50.00, '11122233350', '12345678907'),
('2024-04-08', '15:00:00', 200.00, '11122233351', '12345678908'),
('2024-04-09', '10:00:00', 120.00, '11122233352', '12345678909'),
('2024-04-10', '14:30:00', 70.00, '11122233353', '12345678910');

-- Inserindo dados na tabela agendamento_servicos
INSERT INTO agendamento_servicos (agendamento_id_agendamento, servicos_idservicos, funcionario_cpf_funcionario, valorVenda) VALUES
(1, 1, '12345678901', 50.00),
(1, 2, '12345678901', 30.00),
(2, 3, '12345678902', 20.00),
(2, 4, '12345678902', 20.00),
(3, 5, '12345678903', 80.00),
(3, 6, '12345678903', 40.00),
(4, 7, '12345678904', 60.00),
(4, 8, '12345678904', 100.00),
(5, 9, '12345678905', 80.00),
(5, 10, '12345678905', 30.00),
(6, 1, '12345678906', 50.00),
(6, 3, '12345678906', 20.00),
(7, 2, '12345678907', 30.00),
(7, 5, '12345678907', 80.00),
(8, 6, '12345678908', 40.00),
(8, 7, '12345678908', 60.00),
(9, 8, '12345678909', 100.00),
(9, 9, '12345678909', 30.00),
(10, 10, '12345678910', 30.00),
(10, 1, '12345678910', 50.00);
