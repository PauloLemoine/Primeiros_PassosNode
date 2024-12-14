DELIMITER $$

CREATE PROCEDURE atualizar_nome_cargo(
  IN p_cbo INT,
  IN p_nome_cargo INT
)
BEGIN
  UPDATE cargo SET nome_cargo = p_nome_cargo WHERE cbo = p_cbo;
END $$
DELIMITER ;


-- ------------------------------------------------------------