package edu.stevens.cs522.chatserver.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.LiveData;

import java.util.List;

import edu.stevens.cs522.chatserver.R;
import edu.stevens.cs522.chatserver.databases.ChatDatabase;
import edu.stevens.cs522.chatserver.databases.MessageDao;
import edu.stevens.cs522.chatserver.databases.PeerDao;
import edu.stevens.cs522.chatserver.entities.Message;
import edu.stevens.cs522.chatserver.entities.Peer;
import edu.stevens.cs522.chatserver.ui.CustomArrayAdapter;
import edu.stevens.cs522.chatserver.ui.MessagesAdapter;
import edu.stevens.cs522.chatserver.ui.SimpleArrayAdapter;


public class ViewPeersActivity extends FragmentActivity implements AdapterView.OnItemClickListener {

    /*
     * See ChatServer for example of what to do, query peers database instead of messages database.
     */

    private ChatDatabase chatDatabase;

    SimpleArrayAdapter<Peer> peersAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view_peers);

        peersAdapter = new SimpleArrayAdapter<>(this);
        ListView peersList = findViewById(R.id.peer_list);
        peersList.setAdapter(peersAdapter);

        chatDatabase = ChatDatabase.getInstance(getApplicationContext());

        /*
         * TODO query the database asynchronously, registering an observer for the result.
         */
        PeerDao peerDao = chatDatabase.peerDao();
        CustomArrayAdapter<Peer> adapter = peersAdapter;
        peersList.setAdapter(adapter);
        LiveData<List<Peer>> peers = peerDao.fetchAllPeers();
        peers.observe(this, peer -> {
            adapter.setElements(peer);
            adapter.notifyDataSetChanged();
        });
        // TODO set item click listener to this activity
        peersList.setOnItemClickListener(this);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        chatDatabase = null;
    }

    /*
     * Callback interface defined in TextAdapter, for responding to clicks on rows.
     */
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        /*
         * Clicking on a peer brings up details
         */
        Peer peer = peersAdapter.getItem(position);

        Intent intent = new Intent(this, ViewPeerActivity.class);
        intent.putExtra(ViewPeerActivity.PEER_KEY, peer);
        startActivity(intent);

    }
}
