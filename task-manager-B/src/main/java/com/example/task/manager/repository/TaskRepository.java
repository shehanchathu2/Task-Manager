package com.example.task.manager.repository;

import com.example.task.manager.model.Task;
import com.example.task.manager.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {

    Page<Task> findByUser(User user , Pageable pageable);


    Page<Task> findByPriority(String priority, Pageable pageable);

    Page<Task> findByStatus(String status, Pageable pageable);

    Page<Task> findByPriorityAndStatus(String priority, String status, Pageable pageable);

    Page<Task> findByUserAndPriorityAndStatus(User user, String priority, String status, Pageable pageable);
}
