const Sequelize = require("sequelize");

// 시퀄라이즈는 기본적으로 id를 기본키로 연결

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    // static init 메서드는 모델의 설정 메서드
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false, // 스네이크 케이스
        modelName: "User", // 노드에서 사용하는 모델이름
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  } // 다른 모델과의 관계
};
