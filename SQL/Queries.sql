select date_format(a.datas, "%d/%m/%Y") "Data", a.horario "Horário", concat("R$ ", format(a.valorTotal, 2, "de_DE")) "Preço",
	cli.nome "Cliente", func.nome "Funcionário"
	from agendamento a
    inner join agendamento_servicos aserv on aserv.agendamento_id_agendamento = a.id_agendamento
    inner join cliente cli on a.cliente_cpf = cli.cpf
    inner join funcionario func on a.funcionario_cpf_funcionario = func.cpf_funcionario;