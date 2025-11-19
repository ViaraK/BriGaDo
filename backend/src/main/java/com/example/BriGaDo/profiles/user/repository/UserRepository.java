package com.example.BriGaDo.profiles.user.repository;

import com.example.BriGaDo.profiles.user.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<User> userRowMapper = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User(
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("username"),
                    rs.getString("password_hash"),
                    rs.getString("phone_number"),
                    rs.getString("sex"),
                    rs.getDate("birthday").toLocalDate(),
                    rs.getString("linkedin_link"),
                    rs.getString("cv_file_path")
            );
            user.setId(rs.getLong("id")); // assuming you have id column
            return user;
        }
    };

    // ========== SAVE ==========
    public User save(User user) {
        String sql = "INSERT INTO users (first_name, last_name, username, password_hash, phone_number, sex, birthday, linkedin_link, cv_file_path) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id";
        Long id = jdbcTemplate.queryForObject(sql, Long.class,
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getPasswordHash(),
                user.getPhoneNumber(),
                user.getSex(),
                java.sql.Date.valueOf(user.getBirthday()),
                user.getLinkedinLink(),
                user.getCvFilePath()
        );
        user.setId(id);
        return user;
    }

    // ========== EXISTS BY USERNAME ==========
    public boolean existsByUsername(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, username);
        return count != null && count > 0;
    }

    // ========== FIND BY USERNAME ==========
    public User findByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        return jdbcTemplate.query(sql, userRowMapper, username)
                .stream().findFirst().orElse(null);
    }

    // ========== FIND BY ID ==========
    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.query(sql, userRowMapper, id)
                .stream().findFirst().orElse(null);
    }
}
