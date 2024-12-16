create view questao_1 as
	select date_format(a.datas, "%d/%m/%Y") "Data", a.horario "Horário", concat("R$ ", format(a.valorTotal, 2, "de_DE")) "Preço",
		cli.nome "Cliente", func.nome "Funcionário"
		from agendamento a
		inner join agendamento_servicos aserv on aserv.agendamento_id_agendamento = a.id_agendamento
		inner join cliente cli on a.cliente_cpf = cli.cpf
		inner join funcionario func on a.funcionario_cpf_funcionario = func.cpf_funcionario;

create view questao_2 as
    SELECT f.nome "Funcionário", s.nome "Servico" , concat("R$ ", format(ags.valorVenda, 2, "de_DE")) "Preço"
        FROM funcionario f
        JOIN agendamento_servicos ags ON f.cpf_funcionario = ags.funcionario_cpf_funcionario
        JOIN servicos s ON ags.servicos_idservicos = s.idservicos;

create view questao_3 as
    SELECT  concat("R$ ", format(SUM(a.valorTotal), 2, "de_DE")) "Faturamento", date_format(MIN(a.datas), "%d/%m/%Y")  "Início", date_format(MAX(a.datas), "%d/%m/%Y")
    "Fim"
    FROM agendamento a
    WHERE a.datas BETWEEN '2024-04-01' AND '2024-04-10';

create view questao_4 as
