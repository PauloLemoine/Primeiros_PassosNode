-- cadastro dos funcionários e o cargo
delimiter $$
    create procedure cadFunc(in pcpf varchar(14),
                            in pnome varchar(60),
                            in pcbo varchar(7),
                            in pcargo varchar(45),
                            in psalario decimal(6,2))
        begin
            insert into funcionario (cpf, nome)
                value (pcpf, pnome);
            insert into cargo
                value (pcbo, pcargo, psalario);
        end $$
delimiter;
