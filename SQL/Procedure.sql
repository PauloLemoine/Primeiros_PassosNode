DELIMITER $$
CREATE PROCEDURE atualizar_nome_cargo(
  IN p_cbo varchar(7),
  IN p_nome_cargo varchar(45)
)
BEGIN
	UPDATE cargo SET nome = p_nome_cargo WHERE cbo = p_cbo;
END $$
DELIMITER ;

-- ------------------------------------------------------------
delimiter $$
CREATE PROCEDURE atualizar_salario_cargo(
  IN p_cbo varchar(7),
  IN p_salario decimal(6,2)
)
BEGIN
	UPDATE cargo SET salario = p_salario WHERE cbo = p_cbo;
END $$
DELIMITER ;

-- ------------------------------------------------------------
CREATE PROCEDURE delete_funcionario_by_cpf (IN cpf_func VARCHAR(14))
BEGIN
    -- Verifica se o funcionário existe
    IF EXISTS (SELECT 1 FROM funcionario WHERE cpf_funcionario = cpf_func) THEN
        -- Deleta o funcionário
        DELETE FROM funcionario WHERE cpf_funcionario = cpf_func;
        SELECT 'Funcionário deletado com sucesso' AS message;
    ELSE
        SELECT 'Funcionário não encontrado' AS message;
    END IF;
END $$

DELIMITER ;
-- -----------------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE delete_all_funcionarios()
BEGIN
    DECLARE total_funcionarios INT;

    -- Contar a quantidade de funcionários antes de deletar
    SELECT COUNT(*) INTO total_funcionarios FROM funcionario;

	-- Retornar a quantidade de funcionários deletados
	SELECT total_funcionarios AS total_deletados;
    
    -- Deletar todos os funcionários
    DELETE FROM funcionario;
    
END $$

DELIMITER ;
