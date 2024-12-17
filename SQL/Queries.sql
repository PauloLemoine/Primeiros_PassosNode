create view questao_1 as
	SELECT c.nome "Cliente", a.datas "Data Agendamento", a.horario, concat("R$ ",format(a.valorTotal, 2, "de_DE")) "Valor Total"
        FROM cliente c
            JOIN agendamento a ON c.cpf = a.cliente_cpf;

create view questao_2 as
    SELECT a.id_agendamento, c.nome "Cliente", s.nome "Serviço", concat("R$ ",format(ags.valorVenda, 2, "de_DE")) "Valor de Venda"
        FROM agendamento a
            JOIN cliente c ON a.cliente_cpf = c.cpf
            JOIN agendamento_servicos ags ON a.id_agendamento =
            ags.agendamento_id_agendamento
            JOIN servicos s ON ags.servicos_idservicos = s.idservicos;

create view questao_3 as
    SELECT concat("R$ ",format(SUM(a.valorTotal), 2, "de_DE")) "Valor Total" 
        FROM agendamento a
            WHERE a.datas BETWEEN '2024-04-01' AND '2024-04-10';

create view questao_4 as
    SELECT id_agendamento "Id do Agendamento", date_format(datas, "%d/%m/%Y") "Data", horario, concat("R$ ",format(valorTotal, 2, "de_DE")) "Valor Total",
        cliente_cpf "CPF Cliente", funcionario_cpf_funcionario "CPF Funcionario" FROM agendamento
            WHERE valorTotal > (SELECT AVG(valorTotal) FROM agendamento);

create view questao_5 as
    SELECT s.nome "Serviço", COUNT(ags.servicos_idservicos) "Quantidade"
        FROM servicos s
            LEFT JOIN agendamento_servicos ags ON s.idservicos = ags.servicos_idservicos
            GROUP BY s.nome;

create view questao_6 as
    SELECT COUNT(DISTINCT c.cpf) "Total de Clientes"
        FROM cliente c 
            JOIN agendamento a ON c.cpf = a.cliente_cpf WHERE c.cpf IN ( SELECT cliente_cpf
            FROM agendamento WHERE valorTotal > 100 );

create view questao_7 as
    SELECT f.nome "Funcionario", COUNT(ags.servicos_idservicos) "Quantidade de Serviços"
        FROM funcionario f
            LEFT JOIN agendamento_servicos ags ON f.cpf_funcionario =
            ags.funcionario_cpf_funcionario
            GROUP BY f.nome;

create view questao_8 as
    SELECT idservicos "Id do serviço", nome "Serviço", concat("R$ ", format(valor, 2, "de_DE")) "Valor acima da média"
        FROM servicos
            WHERE valor > (SELECT AVG(valor) FROM servicos);

create view questao_9 as
    SELECT c.nome "Cliente", COUNT(a.id_agendamento) "Total de agendamentos"
        FROM cliente c
            JOIN agendamento a ON c.cpf = a.cliente_cpf
            GROUP BY c.nome
            HAVING COUNT(a.id_agendamento) >= 2;

create view questao_10 as
    SELECT f.nome "Funcionario", concat("R$ ", format(SUM(ags.valorVenda), 2, "de_DE")) "Faturamento"
        FROM funcionario f
            JOIN agendamento_servicos ags ON f.cpf_funcionario = ags.funcionario_cpf_funcionario
            GROUP BY f.nome;

create view questao_11 as
    SELECT c.nome "Cliente", concat("R$ ", format(SUM(a.valorTotal), 2, "de_DE")) "Total Gasto"
        FROM cliente c
            JOIN agendamento a ON c.cpf = a.cliente_cpf
            GROUP BY c.nome;

create view questao_12 as
    SELECT s.nome AS servico, COUNT(*) AS total_realizados
        FROM servicos s
            JOIN agendamento_servicos ags ON s.idservicos = ags.servicos_idservicos
            JOIN agendamento a ON ags.agendamento_id_agendamento = a.id_agendamento
                WHERE MONTH(a.datas) = 4 AND YEAR(a.datas) = 2024
                GROUP BY s.nome;

create view questao_13 as
    SELECT s.nome "Serviço", COUNT(*) "Total Realizados"
        FROM servicos s
            JOIN agendamento_servicos ags ON s.idservicos = ags.servicos_idservicos
            JOIN agendamento a ON ags.agendamento_id_agendamento = a.id_agendamento
                WHERE MONTH(a.datas) = 4 AND YEAR(a.datas) = 2024
                GROUP BY s.nome;

create view questao_14 as
    SELECT c.nome "Cliente", concat("R$ ", format(AVG(a.valorTotal), 2, "de_DE")) "Média Gasto"
        FROM cliente c
            JOIN agendamento a ON c.cpf = a.cliente_cpf
            GROUP BY c.nome;

create view questao_15 as
    SELECT f.nome "Funcionario"
        FROM funcionario f
            WHERE f.cpf_funcionario NOT IN (SELECT DISTINCT funcionario_cpf_funcionario FROM
            agendamento_servicos);

create view questao_16 as
    SELECT DISTINCT c.nome "Cliente", f.nome "Funcionario"
        FROM cliente c
            JOIN agendamento a ON c.cpf = a.cliente_cpf
            JOIN agendamento_servicos ags ON a.id_agendamento =
            ags.agendamento_id_agendamento
            JOIN funcionario f on f.cpf_funcionario = ags.funcionario_cpf_funcionario
                WHERE ags.funcionario_cpf_funcionario IN (
                SELECT cpf_funcionario FROM funcionario WHERE nome LIKE '%Ana%');

create view questao_17 as
    SELECT s.nome "Serviço", concat("R$ ", format(s.valor, 2, "de_DE")) "Valor", (SELECT concat("R$ ", format(AVG(valor), 2, "de_DE")) FROM servicos) AS
        "Média de Valor"
            FROM servicos s
                ORDER BY s.valor DESC;

create view questao_18 as
    SELECT a.id_agendamento "Id do Agendamento", COUNT(ags.servicos_idservicos) "Total de serviços"
        FROM agendamento a
            JOIN agendamento_servicos ags ON a.id_agendamento =
            ags.agendamento_id_agendamento
            GROUP BY a.id_agendamento
            HAVING COUNT(ags.servicos_idservicos) >= 2;

create view questao_19 as
    SELECT s.nome "Serviço", COUNT(*) "Total de serviços Realizados"
        FROM servicos s
            JOIN agendamento_servicos ags ON s.idservicos = ags.servicos_idservicos
                WHERE ags.funcionario_cpf_funcionario = '12345678901'
                GROUP BY s.nome
                ORDER BY "Total de serviços Realizados" DESC;

create view questao_20 as
    SELECT f.nome "Funcionario", COUNT(DISTINCT a.cliente_cpf) "Total de Clientes"
        FROM funcionario f
            JOIN agendamento_servicos ags ON f.cpf_funcionario = ags.funcionario_cpf_funcionario
            JOIN agendamento a ON ags.agendamento_id_agendamento = a.id_agendamento
            GROUP BY f.nome;