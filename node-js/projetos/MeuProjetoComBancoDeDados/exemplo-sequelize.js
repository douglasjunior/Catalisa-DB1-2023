const { DataTypes, Sequelize, Op } = require('sequelize');

const database = 'exemplo';
const user = 'root';
const password = 'root';

const sequelize = new Sequelize(
  database,
  user,
  password,
  {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    define: {
      // desabilita colunas createdAt e updatedAt
      timestamps: false
    }
  }
);

/*

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

*/

const Usuario = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
});

/*

CREATE TABLE `tarefas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(500) DEFAULT NULL,
  `concluida` tinyint(1) NOT NULL DEFAULT '0',
  `data_criacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tarefas_FK` (`usuario_id`),
  CONSTRAINT `tarefas_FK` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
)

*/

const Tarefa = sequelize.define('tarefas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null,
  },
  concluida: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Usuario.hasMany(Tarefa, {
  as: 'tarefas',
  sourceKey: 'id',
  foreignKey: 'usuario_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
})

Tarefa.belongsTo(Usuario, {
  as: 'usuario',
  targetKey: 'id',
  foreignKey: 'usuario_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
})

const inserirUsuario = () => {
  Usuario.create({
    nome: 'Douglas Junior',
    idade: '34',
  }).then(usuario => {
    // você pode acessar agora o usuário criado 
    // através da variável "usuario"

    console.log("Usuário inserido.");

    console.log('ID:', usuario.get('id'));
    console.log('Nome:', usuario.get('nome'));
    console.log('Idade:', usuario.get('idade'));
    console.log('Criação:', usuario.get('data_criacao'));
  });
}

const consultarUsuarioPorId = () => {
  Usuario.findByPk(1)
    .then(usuario => {
      // Retorna o usuário correspondente ao ID especificado, ​
      // ou Null caso não seja encontrado.​

      if (usuario) {
        console.log('Usuário encontrado.');
        console.log('ID:', usuario.get('id'));
        console.log('Nome:', usuario.get('nome'));
        console.log('Idade:', usuario.get('idade'));
        console.log('Criação:', usuario.get('data_criacao'));
      } else {
        console.log('Usuário não encontrado.');
      }

    }).catch(err => {
      console.error("Erro ao consultar usuário.", err);
    })
}

const buscarPrimeiroRegistro = () => {
  Usuario.findOne({
    where: {
      nome: 'Douglas Junior'
    }
  })
    .then(usuario => {
      // Retorna o usuário correspondente ao ID especificado, ​
      // ou Null caso não seja encontrado.​

      if (usuario) {
        console.log('Usuário encontrado.');
        console.log('ID:', usuario.get('id'));
        console.log('Nome:', usuario.get('nome'));
        console.log('Idade:', usuario.get('idade'));
        console.log('Criação:', usuario.get('data_criacao'));
      } else {
        console.log('Usuário não encontrado.');
      }

    }).catch(err => {
      console.error("Erro ao consultar usuário.", err);
    })
}

const atualizandoIdadeDoUsuario = () => {
  Usuario.update(
    {
      idade: 20
    },
    {
      where: {
        nome: 'Douglas Junior'
      }
    }
  ).then(resultado => {
    // Retorna o resultado da consulta em formato de array, onde o primeiro
    // elemento representa a quantidade de registros afetados. 

    const registrosAfetados = resultado[0];

    console.log('Usuários atualizados:', registrosAfetados)

  }).catch(err => {
    console.error("Erro ao atualizar usuário.", err);
  })
}

const removendoUsuario = () => {
  Usuario.destroy(
    {
      where: {
        id: 2
      }
    }
  ).then(registrosAfetados => {
    // Retorna o resultado da consulta, um valor numérico
    // representando a quantidade de registros afetados. 

    console.log('Usuários removidos:', registrosAfetados)

  }).catch(err => {
    console.error("Erro ao remover usuário.", err);
  })
}

const buscarMultiplosUsuarios = () => {
  Usuario.findAll(
    {
      // SELECT `nome`, `idade` FROM ....
      attributes: ['nome', 'idade']
    }
  ).then(usuarios => {
    // Retorna array com os usuários encontrados.

    console.log('Usuários encontrados:');

    usuarios.forEach((usuario) => {
      console.log('ID:', usuario.get('id'));
      console.log('Nome:', usuario.get('nome'));
      console.log('Idade:', usuario.get('idade'));
      console.log('Criação:', usuario.get('data_criacao'));
    });

  }).catch(err => {
    console.error("Erro ao consultar usuário.", err);
  })
}

const contandoQuantidadeDeUsuarios = () => {
  Usuario.findAll(
    {
      // SELECT `nome`, `idade` FROM ....
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'qtd_usuarios']
      ]
    }
  ).then(resultado => {
    // Retorna o resultado da consulta em formato de array, onde o primeiro
    // elemento representa a quantidade de registros encontrados. 

    const quantidadeUsuarios = resultado[0];

    console.log('Usuários encontrados:', quantidadeUsuarios.get('qtd_usuarios'));

  }).catch(err => {
    console.error("Erro ao consultar usuário.", err);
  })
}

const consultandoUsuariosComFiltros = () => {
  Usuario.findAll(
    {
      where: {
        nome: {
          [Op.like]: '%douglas%'
        }
      },
    }
  ).then(usuarios => {
    // Retorna array com os usuários encontrados.

    console.log('Usuários encontrados:');

    usuarios.forEach((usuario) => {
      console.log('ID:', usuario.get('id'));
      console.log('Nome:', usuario.get('nome'));
      console.log('Idade:', usuario.get('idade'));
      console.log('Criação:', usuario.get('data_criacao'));
    });

  }).catch(err => {
    console.error("Erro ao consultar usuário.", err);
  })
}

const consultandoUsuariosComTarefas = () => {
  Usuario.findAll(
    {
      where: {
      },
      include: {
        model: Tarefa,
        as: 'tarefas',
      }
    }
  ).then(usuarios => {
    // Retorna array com os usuários encontrados.

    console.log('Usuários encontrados:');

    usuarios.forEach((usuario) => {
      console.log('ID:', usuario.get('id'));
      console.log('Nome:', usuario.get('nome'));
      console.log('Idade:', usuario.get('idade'));
      console.log('Criação:', usuario.get('data_criacao'));
      console.log('Tarefas:', usuario.get('tarefas', { plain: true }));
    });

  }).catch(err => {
    console.error("Erro ao consultar usuário.", err);
  })
}

const consultandoTarefasComUsuarios = () => {
  Tarefa.findAll(
    {
      where: {
      },
      include: {
        model: Usuario,
        as: 'usuario'
      }
    }
  ).then(tarefas => {
    // Retorna array com as tarefas encontradas.

    console.log('Tarefas encontrados:');

    tarefas.forEach((tarefa) => {
      console.log('ID:', tarefa.get('id'));
      console.log('Descrição:', tarefa.get('descricao'));
      console.log('Concluída:', tarefa.get('concluida'));
      console.log('Criação:', tarefa.get('data_criacao'));
      console.log('Usuário:', tarefa.get('usuario', { plain: true }));
    });

  }).catch(err => {
    console.error("Erro ao consultar tarefa.", err);
  })
}

const criandoUsuarioETarefaComTransacao = () => {
  sequelize.transaction((transaction) => {
    return Usuario.create(
      {
        nome: 'José Silva',
        idade: 20,
      },
      {
        transaction: transaction
      }
    ).then(usuario => {
      return Tarefa.create(
        {
          descricao: 'Tarefa do José',
          usuario_id: usuario.get('id')
        },
        {
          transaction: transaction,
        }
      )
    })
  }).then((tarefaCriada) => {
    // Registros criados com sucesso

    // Consultando tarefa com usuário dentro
    return Tarefa.findByPk(tarefaCriada.get('id'), {
      include: {
        model: Usuario,
        as: 'usuario'
      }
    });
  }).then((tarefa) => {

    console.log('Tarefa com usuário:');

    console.log('ID:', tarefa.get('id'));
    console.log('Descrição:', tarefa.get('descricao'));
    console.log('Concluída:', tarefa.get('concluida'));
    console.log('Criação:', tarefa.get('data_criacao'));
    console.log('Usuário:', tarefa.get('usuario', { plain: true }));

  }).catch(err => {
    console.error("Erro ao criar registros.", err);
  })
};

sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado com sucesso.');

    // Remova o comentário e execute a função conforme desejada

    // inserirUsuario();
    // consultarUsuarioPorId();
    // buscarPrimeiroRegistro();
    // atualizandoIdadeDoUsuario();
    // removendoUsuario();
    // buscarMultiplosUsuarios();
    // contandoQuantidadeDeUsuarios();
    // consultandoUsuariosComFiltros();
    // consultandoUsuariosComTarefas();
    // consultandoTarefasComUsuarios();
    criandoUsuarioETarefaComTransacao();

  }).catch((err) => {
    console.error("Não foi possível se conectar ao banco de dados.", err);
  });
