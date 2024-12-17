-- TRIGGERS

-- Trigger para atualizar valor total do agendamento após inserção
DELIMITER $$
CREATE TRIGGER update_agendamento_total
AFTER INSERT ON salaosenac.agendamento_servicos
FOR EACH ROW
BEGIN
  DECLARE total DECIMAL(6,2);

  -- Calcula o valor total dos serviços associados ao agendamento
  SELECT SUM(valorVenda) INTO total
  FROM salaosenac.agendamento_servicos
  WHERE agendamento_id_agendamento = NEW.agendamento_id_agendamento;

  -- Atualiza o valor total no agendamento
  UPDATE salaosenac.agendamento
  SET valorTotal = total
  WHERE id_agendamento = NEW.agendamento_id_agendamento;
END$$
DELIMITER ;

-- Trigger para evitar valores negativos em valorTotal

DELIMITER $$
CREATE TRIGGER validate_agendamento_valorTotal
BEFORE INSERT ON salaosenac.agendamento
FOR EACH ROW
BEGIN
  IF NEW.valorTotal < 0 THEN
    SET NEW.valorTotal = 0;
  END IF;
END$$
DELIMITER ;

-- Trigger para evitar valores negativos em valorVenda

DELIMITER $$
CREATE TRIGGER validate_agendamento_servicos_valorVenda
BEFORE INSERT ON salaosenac.agendamento_servicos
FOR EACH ROW
BEGIN
  IF NEW.valorVenda < 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Valor de venda não pode ser negativo.';
  END IF;
END$$
DELIMITER ;

-- Trigger para garantir CPF formatado corretamente em cliente

DELIMITER $$
CREATE TRIGGER validate_cliente_cpf
BEFORE INSERT ON salaosenac.cliente
FOR EACH ROW
BEGIN
  IF CHAR_LENGTH(NEW.cpf) <> 14 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'CPF deve ter 14 caracteres.';
  END IF;
END$$
DELIMITER ;
-- Trigger para garantir CPF formatado corretamente em funcionário
DELIMITER $$
CREATE TRIGGER validate_funcionario_cpf
BEFORE INSERT ON salaosenac.funcionario
FOR EACH ROW
BEGIN
  IF CHAR_LENGTH(NEW.cpf_funcionario) <> 14 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'CPF do funcionário deve ter 14 caracteres.';
  END IF;
END $$
DELIMITER ;