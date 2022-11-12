const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { response } = require('express');

router.post('/access', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        const query = `SELECT * FROM Relatorios WHERE chave = ? ORDER BY idRelatorio DESC;`;
        conn.query(query, [req.body.chave], (error, resultado, fields) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    error: error
                });
            }

            if (resultado.length < 1) {
                return res.status(200).send({
                    "error": true,
                    "message": "Não há Relatórios para este usuário",
                });
            }

            if (resultado) {

                return res.status(200).json(resultado);

            }
            return res.status(200).send({
                "error": true,
                "message": "Falha na busca de itens",

            });

        });


    });
});

router.post('/specific', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        const query = `SELECT * FROM Relatorios WHERE idRelatorio = ?;`;
        conn.query(query, [req.body.idRelatorio], (error, resultado, fields) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    error: error
                });
            }

            if (resultado.length < 1) {
                return res.status(200).send({
                    "error": true,
                    "message": "Não há Relatórios para este usuário",
                });
            }

            if (resultado) {

                return res.status(200).json(resultado);

            }
            return res.status(200).send({
                "error": true,
                "message": "Falha na busca de itens",

            });

        });


    });
});

router.post('/store', (req, res, next) => {

    const relatorio = {
        nome: req.body.nome,
        chave: req.body.chave,
        dataProcesso: req.body.dataProcesso,
        idSecao: req.body.idSecao,
        secao: req.body.secao,
        idTitulo: req.body.idTitulo,
        titulo: req.body.titulo,
        made_check: req.body.made_check
    };

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        else {
            conn.query(
                `INSERT INTO Relatorios
                                     (nome, chave, dataProcesso, idSecao, secao, idTitulo, titulo, made_check)
                                 VALUES 
                                    (?,?,?,?,?,?,?,?)`,

                [req.body.nome,
                req.body.chave,
                req.body.dataProcesso,
                req.body.idSecao,
                req.body.secao,
                req.body.idTitulo,
                req.body.titulo,
                req.body.made_check
                ],

                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        return res.status(200).send({
                            error: error,
                            response: null
                        });
                    }
                    res.status(200).send({
                        mensagem: 'Relatorio cadastrado com sucesso',
                        situation: 1
                    });
                }
            );
        }
    });
});


router.post('/finish', (req, res, next) => {

    const relatorio = {
        nome: req.body.nome,
        chave: req.body.chave,
        dataProcesso: req.body.dataProcesso,
        idSecao: req.body.idSecao,
        secao: req.body.secao,
        idTitulo: req.body.idTitulo,
        titulo: req.body.titulo,
        made_check: req.body.made_check
    };

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        else {
            conn.query(
                `UPDATE Relatorios
                SET SECAO= ("RELATÓRIO FINALIZADO POR TECNICO "?""),
                made_check = REPLACE (made_check, "0", "1"), 
                made_check = REPLACE (made_check, "2", "1"),
                made_check = LEFT(made_check, LENGTH(made_check)) +
                Replace(RIGHT(made_check, 1), "1", "1") where idRelatorio=?;`,

                [
                req.body.nome,    
                req.body.idRelatorio
                ],

                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        return res.status(200).send({
                            error: error,
                            response: null
                        });
                    }
                    res.status(200).send({
                        mensagem: 'Relatorio finalizado com sucesso',
                        situation: 1
                    });
                }
            );
        }
    });
});



router.get('/admin/aberto', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        const query = `SELECT Relatorios.idRelatorio, Relatorios.nome, funcionarios.email, Relatorios.dataProcesso, funcionarios.Setor, Relatorios.made_check
        FROM funcionarios
        INNER JOIN Relatorios
        ON funcionarios.chave = Relatorios.chave WHERE Relatorios.made_check not like "%2%";`;
        conn.query(query, (error, resultado, fields) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    error: error
                });
            }

            if (resultado.length < 1) {
                return res.status(200).send({
                    "error": true,
                    "message": "Não há Relatórios para este usuário",
                });
            }

            if (resultado) {

                return res.status(200).json(resultado);

            }
            return res.status(200).send({
                "error": true,
                "message": "Falha na busca de itens",

            });

        });


    });
});

router.get('/admin/fechado', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            })
        }

        const query = `SELECT Relatorios.idRelatorio, Relatorios.nome, funcionarios.email, Relatorios.dataProcesso, funcionarios.Setor, Relatorios.made_check
        FROM funcionarios
        INNER JOIN Relatorios
        ON funcionarios.chave = Relatorios.chave WHERE Relatorios.made_check like "%2%" ORDER BY idRelatorio DESC;`;
        conn.query(query, (error, resultado, fields) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    error: error
                });
            }

            if (resultado.length < 1) {
                return res.status(200).send({
                    "error": true,
                    "message": "Não há Relatórios para este usuário",
                });
            }

            if (resultado) {

                return res.status(200).json(resultado);

            }
            return res.status(200).send({
                "error": true,
                "message": "Falha na busca de itens",

            });

        });


    });
});


module.exports = router;