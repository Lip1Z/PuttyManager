const db = require('../src/config/db');

async function createDataPutty() {
    const query = `
        create table if not exists putty_data(
            id bigint not null primary key
            ,cd_cliente numeric
            ,usuario varchar(100)
            ,senha varchar(50)
            ,balanceador varchar(50)
            ,tunel1 varchar(100)
            ,tunel2 varchar(100)
            ,tunel3 varchar(100)
            ,criado_por varchar(100)
            ,criado_em timestamp
            ,alterado_por varchar(100)
            ,alterado_em timestamp
            );
    `;
   try {
        await db.query(query);
        console.log('Tabela putty_data criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabela putty_data:', error);
    }
}

async function deleteDataPutty(data) {
    if(data.id != null && data.id != undefined) {
        const query = `
            delete from putty_data where id = $1;
        `;
        try {
            await db.query(query, [data.id]);
            console.log('conexao deletada com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar conexao:', error);
        }
    }
    else if (data.cd_cliente != null && data.cd_cliente != undefined) {
        const query = `
            delete from putty_data where cd_cliente = $1;
        `;
        try {
            await db.query(query, [data.cd_cliente]);
            console.log('conexao deletada com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar conexao:', error);
        }
    }
}

async function updateDataPutty(data) {
    if (data.cd_cliente == null) {
        console.error('cd_cliente é obrigatório para atualizar.');
        return;
    }

    // Campos possíveis de atualizar
    const campos = ['usuario', 'senha', 'balanceador', 'tunel1', 'tunel2', 'tunel3'];
    const setParts = [];
    const values = [];
    let idx = 1;

    for (const campo of campos) {
        if (data[campo] !== undefined) {
            setParts.push(`${campo} = $${idx}`);
            values.push(data[campo]);
            idx++;
        }
    }

    if (setParts.length === 0) {
        console.error('Nenhum campo para atualizar.');
        return;
    }

    const query = `update putty_data set ${setParts.join(', ')} where cd_cliente = $${idx}`;
    values.push(data.cd_cliente);

    try {
        await db.query(query, values);
        console.log('conexao atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar conexao:', error);
    }
}
