package edu.stevens.cs522.chatserver.databases;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

import edu.stevens.cs522.chatserver.entities.Message;

// TODO add annotations for Repository pattern
@Dao
public interface MessageDao {
    /**
     *
     * @param chatroom
     * @return
     */
    @Query("SELECT * FROM Message WHERE :chatroom = chatroom")
    public abstract LiveData<List<Message>> fetchAllMessages(String chatroom);

    /**
     *
     * @param peerName
     * @return
     */
    @Query("SELECT * FROM Message WHERE :peerName = sender")
    public LiveData<List<Message>> fetchMessagesFromPeer(String peerName);

    /**
     *
     * @param message
     */
    @Insert
    public void persist(Message message);

}
