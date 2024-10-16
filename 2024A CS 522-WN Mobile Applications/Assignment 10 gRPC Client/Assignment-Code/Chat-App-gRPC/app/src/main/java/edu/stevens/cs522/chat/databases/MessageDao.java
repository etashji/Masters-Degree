package edu.stevens.cs522.chat.databases;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Transaction;
import androidx.room.Update;

import java.util.List;

import edu.stevens.cs522.chat.entities.Chatroom;
import edu.stevens.cs522.chat.entities.Message;
import edu.stevens.cs522.chat.entities.Peer;

// TODO add annotations for Repository pattern
@Dao
public interface MessageDao {
    /**
     * @param chatroom
     * @return
     */
    @Query("SELECT * FROM Message WHERE :chatroom = chatroom")
    public abstract LiveData<List<Message>> fetchAllMessages(String chatroom);

    /**
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
